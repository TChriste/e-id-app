export default interface ProposalInterface {
    auto_remove: boolean;
    comment: string;
    connection_id: string;
    credential_preview: {
        "@type": string;
        attributes: Attribute[];  
    };
    filter: {
        indy: {
            "cred_def_id": string;
            "schema_id": string;
            "schema_name": string;
            "schema_version": string;
        }
    },
    "trace": boolean ;

}

export interface Attribute {
    "mime-type": string;
    name: string;
    value: string;    
}