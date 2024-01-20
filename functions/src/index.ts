import {CallableOptions, HttpsError, onCall} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger"
import axios from "axios"
import type { OLegRequest, OLegResponse } from "../../apiTypedef"

const callableCommonOption: CallableOptions = {
  region: "asia-northeast3"
}

function base64ToBlob(base64String: string): Blob | null {
  const matches = base64String.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);

  if (!matches || matches.length !== 3) {
    // Invalid base64 string format
    console.error('Invalid base64 string format');
    return null;
  }

  const contentType = matches[1];
  const byteCharacters = Buffer.from(matches[2], 'base64').toString('binary');
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: contentType });
}



export const predictOLeg = onCall(callableCommonOption, async (request) => {
  const body = request.data as OLegRequest

  const fileBlob = base64ToBlob(body.file)
  if (!fileBlob) throw new HttpsError("invalid-argument", "사진이 없습니다")

  const formData = new FormData()
  formData.append("file", fileBlob, "test." + fileBlob.type.split("/")[1])

  const res = await axios.post<OLegResponse>(
    "http://3.35.105.235:5001/upload/", 
    formData, 
  )
  logger.debug(res)
  return res.data
});
