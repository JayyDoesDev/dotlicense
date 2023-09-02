declare type licenseAgurments = "MIT" | "Apache";
declare interface generateLicenseOptions {
    author: string;
    data?: null
};
declare function getLicense(ln: licenseAgurments): string | Object;
declare function searchAndReturn(ln: licenseAgurments): string | Object;
declare function formatDirname(dirname: string): string;
declare function generateLicense(ln: licenseAgurments, options: generateLicenseOptions): void