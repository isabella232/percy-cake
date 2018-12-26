import { appPercyConfig } from 'config';
  it('PageLoad action should be successful for add new file mode', async () => {
    const spy = spyOn(fileService, 'getEnvironments');

    spy.and.returnValue({ environments: ['dev', 'prod'], appPercyConfig: { key: 'value' } });
    ctx.store.dispatch(new PageLoad({ fileName: null, applicationName: 'app1', editMode: false }));
    expect(ctx.editorState().editMode).toBeFalsy();
    await ctx.fixture.whenStable();

    const file: ConfigFile = {
      fileName: null,
      applicationName: 'app1',
      draftConfig: new Configuration(),
      modified: true
    };
    expect(reducer.getConfigFile(ctx.editorState())).toEqual(file);
    expect(reducer.getConfiguration(ctx.editorState())).toEqual(file.draftConfig);
    expect(reducer.getIsPageDirty(ctx.editorState())).toBeTruthy();
    expect(appPercyConfig).toEqual({ key: 'value' });

    expect(reducer.getEnvironments(ctx.editorState())).toEqual(['dev', 'prod']);
  });
  it('PageLoad action should be successful for edit file mode', async () => {
    const spy = spyOn(fileService, 'getEnvironments');
    spy.and.returnValue({ environments: ['dev', 'prod'], appPercyConfig: { key1: 'value1' } });

    const file: ConfigFile = {
      fileName: 'test.yaml', applicationName: 'app1', originalConfig: new Configuration()
    };
    spyOn(fileService, 'getFileContent').and.returnValue(file);

    ctx.store.dispatch(new PageLoad({ fileName: 'test.yaml', applicationName: 'app1', editMode: true }));
    await ctx.fixture.whenStable();
    await ctx.fixture.whenStable();


    expect(reducer.getConfigFile(ctx.editorState())).toEqual(file);
    expect(reducer.getConfiguration(ctx.editorState())).toEqual(file.originalConfig);
    expect(reducer.getIsPageDirty(ctx.editorState())).toBeFalsy();
    expect(appPercyConfig).toEqual({ key1: 'value1' });
  });

  it('PageLoad action should be successful for edit file mode, file content already loaded in state', async () => {
    const file: ConfigFile = {
      fileName: 'test.yaml', applicationName: 'app1', originalConfig: new Configuration()
    };
    ctx.store.next(new BackendActions.LoadFilesSuccess({ files: [file], applications: ['app1'] }));

    const spy = spyOn(fileService, 'getEnvironments');
    spy.and.returnValue({ environments: ['dev', 'prod'], appPercyConfig: { key1: 'value1' } });

    const getFileContentSyp = spyOn(fileService, 'getFileContent');

    ctx.store.dispatch(new PageLoad({ fileName: 'test.yaml', applicationName: 'app1', editMode: true }));
    expect(ctx.editorState().editMode).toBeTruthy();
    await ctx.fixture.whenStable();
    await ctx.fixture.whenStable();

    expect(reducer.getEnvironments(ctx.editorState())).toEqual(['dev', 'prod']);

    expect(reducer.getConfigFile(ctx.editorState())).toEqual(file);
    expect(reducer.getConfiguration(ctx.editorState())).toEqual(file.originalConfig);
    expect(reducer.getIsPageDirty(ctx.editorState())).toBeFalsy();
    expect(appPercyConfig).toEqual({ key1: 'value1' });

    expect(getFileContentSyp.calls.count()).toEqual(0);
    ctx.store.dispatch(new PageLoad({ fileName: null, applicationName: 'app1', editMode: true }));
        alertType: 'go-to-dashboard'
    ctx.store.dispatch(new PageLoad({ fileName: null, applicationName: 'app1', editMode: false }));
    ctx.store.dispatch(new PageLoad({ fileName: null, applicationName: 'app1', editMode: true }));