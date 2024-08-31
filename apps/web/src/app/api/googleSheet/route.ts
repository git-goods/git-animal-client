import { JWT } from 'google-auth-library';
import type { GoogleSpreadsheetWorksheet } from 'google-spreadsheet';
import { GoogleSpreadsheet } from 'google-spreadsheet';

const privateKey = process.env.GOOGLE_PRIVATE_KEY;
const accountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const documentID = process.env.GOOGLE_LOG_DOCUMENT_ID;

type GoogleSheetType = 'general';

interface GoogleSheetValue {
  headerValues: string[];
  title: string;
}

const GOOGLE_SHEET: Record<GoogleSheetType, GoogleSheetValue> = {
  general: {
    headerValues: ['createdAt', 'data', 'description'],
    title: 'general',
  },
};

async function loadGoogleDocument() {
  try {
    const formattedKey = privateKey?.replace(/\\n/g, '\n');

    const serviceAccountAuth = new JWT({
      key: formattedKey,
      email: accountEmail,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    if (!documentID) throw new Error('documentID is not defined');
    if (!serviceAccountAuth) throw new Error('serviceAccountAuth is not defined');

    const doc = new GoogleSpreadsheet(documentID, serviceAccountAuth);
    await doc.loadInfo();

    return doc;
  } catch (error) {
    console.error(error);
  }
}

const loadGoogleSheet = async (doc: GoogleSpreadsheet, type: GoogleSheetType): Promise<GoogleSpreadsheetWorksheet> => {
  let sheet = doc.sheetsByTitle[type];

  if (!sheet) {
    sheet = await doc.addSheet(GOOGLE_SHEET[type]);
  }

  return sheet;
};

// google sheet load get
export async function GET() {
  const type = 'general';

  try {
    const doc = await loadGoogleDocument();
    if (!doc) return Response.json({ success: false, error: 'google sheet를 찾지 못했습니다.' });

    await loadGoogleSheet(doc, type);

    return Response.json({ success: true });
  } catch (error: any) {
    return new Response(error.message, { status: 400 });
  }
}

export async function POST(request: Request) {
  const res = await request.json();
  const type = 'general';

  try {
    const doc = await loadGoogleDocument();
    if (!doc) return Response.json({ success: false, error: 'google sheet를 찾지 못했습니다.' });

    const sheet = await loadGoogleSheet(doc, type);

    const { description, ...data } = res;

    await sheet.addRow({
      createdAt: getCurrentKoreaTime(),
      data: JSON.stringify(data),
      description,
    });

    return Response.json({ success: true });
  } catch (error: any) {
    return new Response(error.message, { status: 400 });
  }
}

const getCurrentKoreaTime = () => {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
  const koreaTimeDiff = 9 * 60 * 60 * 1000;

  return new Date(utc + koreaTimeDiff).toLocaleString();
};
