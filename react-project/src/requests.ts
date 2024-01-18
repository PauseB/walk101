import fs from "fs"
import FormData from "form-data"
import axios from "axios"

const backendUrl = "http://3.35.105.235:5001/upload/"

export type OLegAnalysis = {
  image: string,
  xray: string,
  "left-type": any,
  "left-angle": any,
  "right-type": any,
  "right-angle": any,
}
type OLegResult = {
  imageUrl: string,
  analysis: OLegAnalysis,
}
export async function predictOLeg(inputImageData: string) {
  const formData = new FormData()
  formData.append("file", inputImageData)
  const res = await axios.post<OLegResult>(backendUrl, formData)
  return res.data.analysis
}