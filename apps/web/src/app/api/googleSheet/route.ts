import { JWT } from 'google-auth-library';
import { GoogleSpreadsheet } from 'google-spreadsheet';

const privateKey = process.env.GOOGLE_PRIVATE_KEY;
const accountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const documentID = process.env.GOOGLE_LOG_DOCUMENT_ID;

async function loadGoogleDoc() {
  try {
    const formattedKey = privateKey?.replace(/\\n/g, '\n');

    const serviceAccountAuth = new JWT({
      key: formattedKey,
      email: accountEmail,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(documentID || '', serviceAccountAuth);
    await doc.loadInfo();

    return doc;
  } catch (error) {
    console.error(error);
  }
}

export async function POST(request: Request) {
  const res = await request.json();

  try {
    const doc = await loadGoogleDoc();
    if (!doc) return Response.json({ success: false, error: 'google sheet를 찾지 못했습니다.' });

    // 시트가 있는지 확인 후 없으면 생성
    let sheet = doc.sheetsByTitle['test'];
    if (!sheet) {
      sheet = await doc.addSheet({
        headerValues: ['data', 'createdAt'],
        title: 'test',
      });
    }

    await sheet.addRow({
      data: JSON.stringify(res),
      createdAt: getCurrentKoreaTime(),
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
