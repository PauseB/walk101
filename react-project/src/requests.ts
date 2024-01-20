import { httpsCallable } from "firebase/functions";
import { functions } from "./firebase";
import type { OLegRequest, OLegResponse } from "../../apiTypedef"


export const predictOLegCallable = httpsCallable<OLegRequest, OLegResponse>(functions, "predictOLeg")
