import { PackageHashToBlobInfoMap } from "../../script/types";
export declare type AppOs = 'iOS' | 'Android' | 'Tizen' | 'Windows' | 'Linux' | 'Custom';
export declare type AppPlatform = 'Cordova' | 'Java' | 'Objective-C-Swift' | 'React-Native' | 'Unity' | 'UWP' | 'Xamarin' | 'Electron' | 'Unknown';
export declare type AppMemberPermissions = 'manager' | 'developer' | 'viewer' | 'tester';
export declare type AppOrigin = 'app-center' | 'codepush';
export interface UserProfile {
    id: string;
    avatar_url: string;
    can_change_password: boolean;
    display_name: string;
    email: string;
    name: string;
    permissions?: AppMemberPermissions[];
}
export interface ApiToken {
    id: string;
    api_token: string;
    description: string;
    created_at: string;
}
export interface ApiTokensGetResponse {
    id: string;
    description: string;
    created_at: string;
}
export interface App {
    id?: string;
    app_secret?: string;
    azure_subscription_id?: string;
    description?: string;
    display_name?: string;
    icon_url?: string;
    name?: string;
    os?: AppOs;
    owner?: Owner;
    platform?: AppPlatform;
    origin?: AppOrigin;
}
interface Owner {
    id: string;
    avatar_url: string;
    display_name: string;
    email: string;
    name: string;
    type: OwnerType;
}
declare type OwnerType = 'org' | 'user';
export interface Deployment {
    createdTime: number;
    id?: string;
    name: string;
    key: string;
    latest_release?: any;
    removedEmail?: string;
}
export interface CodePushRelease {
    target_binary_range?: string;
    is_disabled?: boolean;
    package_hash?: string;
    released_by?: string;
    description?: string;
    release_method?: string;
    upload_time?: number;
    is_mandatory?: boolean;
    blob_url?: string;
    label?: string;
    rollout?: number;
    size?: number;
    original_label?: string;
    original_deployment?: string;
    diff_package_map?: PackageHashToBlobInfoMap;
}
export interface ReleaseModification {
    target_binary_range: string;
    description: string;
    is_disabled: boolean;
    is_mandatory: boolean;
    rollout: number;
    label?: string;
}
export interface DeploymentMetrics {
    label: string;
    active: number;
    downloaded: number;
    failed: number;
    installed: number;
}
export interface UpdatedApp {
    name: string;
    display_name?: string;
}
export interface ApigatewayAppCreationRequest {
    org: string;
    appcenterClientApp: App;
}
export interface appParams {
    appOwner: string;
    appName: string;
}
export {};
