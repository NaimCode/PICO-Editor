import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore/lite";
import { db } from "../config";
import { AppDispatch } from "../state";
import { DataAction, TTemplate } from "../state/slices/dataSlice";
import { TNode, TProjectSize } from "../state/slices/boardSlice";

const templateCollection = collection(db, "templates");
const templateDoc=(id:string)=>doc(db, "templates", id);
 const getTemplates = async (
  templates: Array<TTemplate>,
  dispatch: any
) => {
  try {
    if (templates.length == 0) {
      const querySnapshot = await getDocs(templateCollection);
      console.log(querySnapshot.size);
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
      });
      const tempTemplates: Array<TTemplate> = querySnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id } as TTemplate;
      });
      if (dispatch) {
        dispatch(DataAction.Templates(tempTemplates));
      }
    }
  } catch (error: any) {
    throw new Error("Error getting Templates :", error);
  }
};

 const AddTemplate = async (templates: Array<TNode>, dispatch: any) => {
  try {
    const data = {
      nodes: templates,
      type: getTemplateType(templates[0]),
    };

    const docRef = await addDoc(templateCollection, data);
    dispatch(DataAction.AddTemplate({ ...data, id: docRef.id }));
    console.log("Template added with ID: ", docRef.id);
  } catch (e: any) {
    throw new Error("Error adding Template :", e);
  }
};

const DeleteTemplate = async (id:string, dispatch: any) => {
    try {
        await deleteDoc(templateDoc(id));
      dispatch(DataAction.DeleteTemplate(id));
      console.log("Template deleted");
    } catch (e: any) {
      throw new Error("Error adding Template :", e);
    }
  };
  



export function getTemplateType(node: TNode): TProjectSize {
  let type: TProjectSize = "Portrait";
  switch (node.props.width) {
    case 800:
      type = "Landscape";
      break;
    case 520:
      type = "Square";
      break;
    case 420:
      type = "Portrait";
      break;
    default:
      type = "Portrait";
      break;
  }
  return type;
}

const TemplateQuery={getTemplates,AddTemplate,DeleteTemplate}
export default TemplateQuery;
