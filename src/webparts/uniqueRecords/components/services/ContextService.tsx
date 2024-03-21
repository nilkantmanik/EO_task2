import {
  HttpClient,
  SPHttpClient,
  MSGraphClientFactory,
} from "@microsoft/sp-http";
export default class ContextService {
  private static httpClient: HttpClient;
  private static spClient: SPHttpClient;
  private static url: string;
  private static graphClient: MSGraphClientFactory;
  private static currentUser: any;
  private static currentUserId: number;
  private static currentLanguage: number;
  private static farmLabel: string;
  private static context: any;
  private static guid: string;
  private static settingsId: string;
  private static digestKey: string;
  public static Init(
    spClient: SPHttpClient,
    httpClient: HttpClient,
    graphClient: MSGraphClientFactory,
    url: string,
    currentUser: any,
    currentUserId: number,
    currentLanguage: number,
    farmLabel: string,
    context: any,
    guid: string
  ) {
    this.spClient = spClient;
    this.httpClient = httpClient;
    this.url = url;
    this.graphClient = graphClient;
    this.currentUser = currentUser;
    this.currentUserId = currentUserId;
    this.currentLanguage = currentLanguage;
    this.farmLabel = farmLabel;
    this.context = context;
    this.guid = guid;
  }
  public static SetSettingsId(id) {
    this.settingsId = id;
  }
  public static GetSettingsId() {
    return this.settingsId;
  }
  public static GetGraphContext() {
    return this.graphClient;
  }
  public static GetFullContext() {
    return this.context;
  }

  public static GetHttpContext() {
    return this.httpClient;
  }

  public static GetSPContext() {
    return this.spClient;
  }
  public static GetUrl(): string {
    return this.url;
  }
  public static GetCurrentUser(): any {
    return this.currentUser;
  }
  public static GetCurrentLanguage(): number {
    return this.currentLanguage;
  }
  public static GetCurentUserId(): number {
    return this.currentUserId;
  }
  public static setDigestKey(digestKey: string) {
    this.digestKey = digestKey;
  }
  public static getDigestKey(): any {
    return this.digestKey;
  }
  public static GetCurentUserGuid(): string {
    return this.guid;
  }
  public static GetGlocation(): string {
    return this.farmLabel.split("_")[0];
  }
  public static GetcurrentCultureName(): string {
    return this.farmLabel.split("_")[0];
  }

  public static GetAdminUrl() {
    return (
      this.url
        .replace(".sharepoint.com", "-admin.sharepoint.com")
        .split(".com")[0] + ".com"
    );
  }
  public static async Get(url: string): Promise<any> {
    const response = await this.httpClient.get(url, HttpClient.configurations.v1);
    return await response.json();
  }
}
