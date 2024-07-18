import { GoogleSpreadsheet, GoogleSpreadsheetRow } from 'google-spreadsheet';
import { useEffect, useState } from 'react';

// https://docs.google.com/spreadsheets/d/1sSyMmE56334vvOONNmHmk1tvMpO8zoNOXCRJxmPmHvw/edit?gid=0#gid=0

const credential = require('/credential.json');

// 구글 시트 조회하는 로직
export const getGoogleSheet: () => Promise<GoogleSpreadsheet> = async () => {
  const doc = new GoogleSpreadsheet('1sSyMmE56334vvOONNmHmk1tvMpO8zoNOXCRJxmPmHvw');
  // 구글 인증이 필요하다.
  await doc.useServiceAccountAuth(credential);
  await doc.loadInfo();
  return doc;
};

// 구글 시트 조회하는 custom useHook
const useGoogleSheet = (sheetId: number) => {
  const [googleSheetRows, setGoogleSheetRows] = useState<GoogleSpreadsheetRow[]>([]);

  const fetchGoogleSheetRows = async () => {
    const googleSheet = await getGoogleSheet();
    const sheetsByIdElement = googleSheet.sheetsById[sheetId];
    const rows = await sheetsByIdElement.getRows();
    setGoogleSheetRows(rows);
  };

  useEffect(() => {
    fetchGoogleSheetRows();
  }, []);

  return [googleSheetRows];
};

export default useGoogleSheet;
