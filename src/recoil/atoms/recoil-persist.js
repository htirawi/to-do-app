import { recoilPersist } from "recoil-persist";
import { RECOIL_PERSIST_KEY } from "../../constants";

const { persistAtom } = recoilPersist({
  key: RECOIL_PERSIST_KEY,
});

export default persistAtom;
