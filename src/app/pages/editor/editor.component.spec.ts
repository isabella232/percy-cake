import { Setup, assertDialogOpened, TestContext } from 'test/test-helper';
import { PROPERTY_VALUE_TYPES, appPercyConfig } from 'config';
import { EditorPageComponent } from './editor.component';
import { of } from 'rxjs';
describe('EditorPageComponent', () => {
  const setup = Setup(EditorPageComponent, false);
  let ctx: TestContext<EditorPageComponent>;
  it('should create EditorPageComponent', () => {
  it('should init EditorPageComponent with edit file mode', () => {
    expect(dispatchSpy.calls.count()).toEqual(1);
    expect(pageLoad).toEqual({ fileName: file.fileName, applicationName: file.applicationName, editMode: true });
  const newFile = {
    fileName: null,
    applicationName: 'app1',
    draftConfig: new Configuration(),
    modified: true
  };
    expect(dispatchSpy.calls.count()).toEqual(1);
    expect(pageLoad).toEqual({ fileName: null, applicationName: file.applicationName, editMode: false });
    ctx.store.next(new GetFileContentSuccess({file: newFile, newlyCreated: true}));
  it('should not save draft if validation failed', async () => {
    const spy = jasmine.createSpyObj('', ['validate']);
    spy.validate.and.returnValue(of({ valid: false }));
    ctx.component.editor = spy;
  // it('should not save draft if yaml config is invalid', async () => {
  //   await initNewFileMode();
  //   const config = new Configuration();
  //   config.default.addChild(new TreeNode('key1', PROPERTY_VALUE_TYPES.STRING, utilService.constructVariable('key1')));
  //   config.environments.addChild(new TreeNode('dev'));
  //   ctx.component.editor.onConfigChange(config);
  //   ctx.component.editor.filename.setValue('test.yaml');
  //   ctx.component.saveConfig();
  //   assertDialogOpened(AlertDialogComponent, {
  //     data: { message: `YAML validation failed:\nLoop variable reference: key1->key1`, alertType: 'error' },
  //   });
  //   expect(dispatchSpy.calls.mostRecent().args[0] instanceof SaveDraft).toBeFalsy();
  // });
    const configuration = new Configuration();
    configuration.default.addChild(new TreeNode('key1', PROPERTY_VALUE_TYPES.STRING, 'aaa'));
    configuration.default.addChild(new TreeNode('key2', PROPERTY_VALUE_TYPES.STRING, 'bbb'));
    configuration.environments.addChild(new TreeNode('dev'));
    const spy = jasmine.createSpyObj('', ['validate', 'getFileName']);
    spy.validate.and.returnValue(of({ valid: true, editorState: {configuration, configFile: newFile} }));
    spy.getFileName.and.returnValue('test.yaml');
    ctx.component.editor = spy;
          draftConfig: configuration,
    const spy = jasmine.createSpyObj('', ['validate']);
    spy.validate.and.returnValue(of({ valid: false }));
    ctx.component.editor = spy;
  // it('should not commit file if yaml config is invalid', async () => {
  //   await initNewFileMode();
  //   const config = new Configuration();
  //   config.default.addChild(new TreeNode('key1', PROPERTY_VALUE_TYPES.STRING, utilService.constructVariable('key1')));
  //   config.environments.addChild(new TreeNode('dev'));
  //   ctx.component.editor.onConfigChange(config);
  //   ctx.component.editor.filename.setValue('test.yaml');
  //   ctx.component.saveConfig();
  //   assertDialogOpened(AlertDialogComponent, {
  //     data: { message: `YAML validation failed:\nLoop variable reference: key1->key1`, alertType: 'error' },
  //   });
  //   expect(dispatchSpy.calls.mostRecent().args[0] instanceof CommitChanges).toBeFalsy();
  // });
    const configuration = new Configuration();
    configuration.default.addChild(new TreeNode('key1', PROPERTY_VALUE_TYPES.STRING, 'aaa'));
    configuration.default.addChild(new TreeNode('key2', PROPERTY_VALUE_TYPES.STRING, 'bbb'));
    configuration.environments.addChild(new TreeNode('dev'));
    const spy = jasmine.createSpyObj('', ['validate', 'getFileName']);
    spy.validate.and.returnValue(of({ valid: true, editorState: {configuration, configFile: newFile} }));
    spy.getFileName.and.returnValue('test.yaml');
    ctx.component.editor = spy;
          draftConfig: configuration,
        confirmationText: 'There may be unsaved changes.\nAre you sure you want to navigate away from the page?'
  it('should reset app percy config when component destory', () => {
    appPercyConfig['key1'] = 'value1';
    appPercyConfig['key2'] = 'value2';
    ctx.component.ngOnDestroy();
    expect(appPercyConfig).toEqual({});