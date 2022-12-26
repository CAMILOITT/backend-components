export interface IConfigEnvironment {
  configFirebase: IConfigFirebase;
  port: number;
}

interface IConfigFirebase {
  projectId: string | undefined;
  clientEmail: string | undefined;
  privateKey: string | undefined;
}
