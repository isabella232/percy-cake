import { SETUP, assertDialogOpened, TestContext, utilService } from "test/test-helper";
import { appPercyConfig } from "config";
import { TreeNode, PROPERTY_VALUE_TYPES} from "models/tree-node";
  const setup = SETUP(EditorComponent);
      fileName: {} as any
      fileName: {} as any
        resolve(true);
  const initNewFileMode = async () => {
      fileName: {} as any
    await ctx.asyncWait();
  };
    expect(spy.saveAddEditProperty.calls.mostRecent().args[0]).toEqual(node);