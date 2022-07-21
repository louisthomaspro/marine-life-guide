import { doc, getDoc, setDoc } from "firebase/firestore";
import { IMarineLife } from "../models/MarineLife";
import { firestore } from "./firestore";

const collectionName = "lives";

// https://github.com/ShekMak/todo-next/blob/main/firebase/firestore.ts

export const getMarineLife = (id: string) => {
  const document = getDoc(doc(firestore, `${collectionName}/${id}`));
  return document.then((doc) => doc.data())  as Promise<IMarineLife>;
};

export const setMarineLife = (data: IMarineLife, id: string) => {
  return setDoc(doc(firestore, collectionName, id), data);
};

export const setMarineLifeFromINaturalist = async (inaturalistId: string) => {
  let data: any = {};
  try {
    const res = await fetch(
      `https://api.inaturalist.org/v1/taxa/${inaturalistId}?locale=fr`
    );
    const jsonData: any = await res.json();
    data = jsonData.results[0];
  } catch (err) {
    console.log(err);
  }

  let marineLifeData: IMarineLife = {
    id: data.id,
    scientific_name: data.name ?? null,
    french_common_name: data.preferred_common_name ?? null,
    english_common_name: data.english_common_name ?? null,
    wikipedia_url: data.wikipedia_url ?? null,
    photos: [],
    conservation_status: data.conservation_status?.status ?? null,
  };
  (data.taxon_photos as any[]).forEach((element) => {
    marineLifeData.photos.push({
      medium_url: element.photo.medium_url,
      id: element.photo.id,
    });
  });
  console.log(marineLifeData);
  return setDoc(doc(firestore, collectionName, inaturalistId), marineLifeData);
};

export const populate = async () => {
  const ids = [
    50972, 118682, 50968, 54661, 118640, 118667, 100119, 103912, 105923, 118590,
    49601, 118662, 112372, 118674, 50972, 118652, 118622, 118943, 59704, 39659,
  ];

  let result = true;
  for (let id of ids) {
    result = await setMarineLifeFromINaturalist(id.toString())
      .then((doc) => {
        console.log("Doc added", doc);
        return true;
      })
      .catch((error) => {
        console.error("Error happened:", error);
        return false;
      });
    if (!result) break;
  }

  return result;
};
