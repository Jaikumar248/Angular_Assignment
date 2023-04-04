export interface CreateUser{
    name:string,
    email_Id:string
}
export interface Ticket {
    ticket_id:any;
    user_id:any;
    category_desc:any;
    sub_category_desc:any;
    assignee:any;
    subject:any;
    description:any;
    status:any;
    priority:any;
    create_datetime:any;
    last_modified_datetime:any;
    reporter_id:any;
    url:any;
    createdSource:any;
    createdSourceType:any;
    modifiedSource:any;
    modifiedSourceType:any
}