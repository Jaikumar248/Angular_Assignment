export interface CreateUser {
    name: string,
    emailId: string
}
export interface Ticket {
    ticketId: any;
    userId: any;
    categoryDesc: any;
    subCategoryDesc: any;
    assignee: any;
    subject: any;
    description: any;
    status: any;
    priority: any;
    createDateTime: any;
    lastModifiedDatetime: any;
    reporterId: any;
    url: any;
    createdSource: any;
    createdSourceType: any;
    modifiedSource: any;
    modifiedSourceType: any
}