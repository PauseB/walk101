export type OLegRequest = {
  file: string,
}
export type OLegAnalysis = {
  image: string,
  xray: string,
  "left-type": any,
  "left-angle": any,
  "right-type": any,
  "right-angle": any,
}
export type OLegResponse = {
  imageUrl: string,
  analysis: OLegAnalysis,
}


export type FeetArchRequest = {

}
export type FeetArchResponse = {

}


export type FeetHeelRequest = {

}
export type FeetHeelResponse = {

}
