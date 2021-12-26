# EIdApp
## Installation
### Mise en place de la VM et des outils nécessaires
```bash
sudo apt-get install apt-transport-https ca-certificates curl gnupg-agent software-properties-common
sudo apt-get install docker docker-compose
sudo usermod -a -G docker $USER
sudo apt-get install pip
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 68DB5E88
sudo add-apt-repository "deb https://repo.sovrin.org/sdk/deb bionic master"
sudo apt-get update
sudo apt-get install -y libindy
sudo apt install python3-pip
pip3 install aries-cloudagent
pip install python3-indy
pip install pytest-xdist
```
Une fois les commandes ci-dessus exécutées, il est nécessaire de redémarrer la VM.

### Installation et démarrage de von-network
1. Clone du projet
```bash
git clone https://github.com/bcgov/von-network.git
```
3. Build et démarrage
```bash
cd von-network/
sudo ./manage build
sudo ./manage start --logs
```
4. Von-network est visible à l'adresse : http://0.0.0.0:9000

### Enregistrement de la confédération
```bash
curl -X POST "http://localhost:9000/register" -d '{"seed": "Conf0000000000000000000000000001", "role": "TRUST_ANCHOR", "alias": "Confederation"}'
```

### Lancer l'agent de la confédération
```bash
aca-py start --label Conf -it http 0.0.0.0 8000 -ot http --admin 0.0.0.0 11000 --admin-insecure-mode --genesis-url http://localhost:9000/genesis --seed Conf0000000000000000000000000001 --endpoint http://localhost:8000/ --debug-connections --auto-provision --wallet-type indy --wallet-name Conf1 --wallet-key secret
```
### Lancer l'agent bob
```bash
aca-py start --label Bob -it http 0.0.0.0 8001 -ot http --admin 0.0.0.0 11001 --admin-insecure-mode --endpoint http://localhost:8001/ --genesis-url http://localhost:9000/genesis --debug-connections --auto-provision --wallet-local-did --wallet-type indy --wallet-name Bob1 --wallet-key secret
```

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.2.

### Créer une connexion entre la confédération et Bob
1. *Confédération envoie une invitation :* Dans l'agent Confédération, exécuter l'end-point : "/out-of-band/create-invitation (POST)"
Body : 
```json
{
  "handshake_protocols": [
    "did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/didexchange/1.0"
  ],
  "use_public_did": false
}
```
Réponse : 
```json
{
  "state": "initial",
  "invi_msg_id": "a40bb544-46b8-4aa0-bfe3-048e306b690b",
  "invitation": {
    "@type": "did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/out-of-band/1.0/invitation",
    "@id": "a40bb544-46b8-4aa0-bfe3-048e306b690b",
    "services": [
      {
        "id": "#inline",
        "type": "did-communication",
        "recipientKeys": [
          "did:key:z6Mkg6TynY8RWhqQWAgr8u67R1tFp9JVyqQkdJTw5FB4BBzm"
        ],
        "serviceEndpoint": "http://localhost:8000/"
      }
    ],
    "label": "Conf",
    "handshake_protocols": [
      "did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/didexchange/1.0"
    ]
  },
  "invitation_url": "http://localhost:8000/?oob=eyJAdHlwZSI6ICJkaWQ6c292OkJ6Q2JzTlloTXJqSGlxWkRUVUFTSGc7c3BlYy9vdXQtb2YtYmFuZC8xLjAvaW52aXRhdGlvbiIsICJAaWQiOiAiYTQwYmI1NDQtNDZiOC00YWEwLWJmZTMtMDQ4ZTMwNmI2OTBiIiwgInNlcnZpY2VzIjogW3siaWQiOiAiI2lubGluZSIsICJ0eXBlIjogImRpZC1jb21tdW5pY2F0aW9uIiwgInJlY2lwaWVudEtleXMiOiBbImRpZDprZXk6ejZNa2c2VHluWThSV2hxUVdBZ3I4dTY3UjF0RnA5SlZ5cVFrZEpUdzVGQjRCQnptIl0sICJzZXJ2aWNlRW5kcG9pbnQiOiAiaHR0cDovL2xvY2FsaG9zdDo4MDAwLyJ9XSwgImxhYmVsIjogIkNvbmYiLCAiaGFuZHNoYWtlX3Byb3RvY29scyI6IFsiZGlkOnNvdjpCekNic05ZaE1yakhpcVpEVFVBU0hnO3NwZWMvZGlkZXhjaGFuZ2UvMS4wIl19",
  "trace": false
}
```
2. *Bob revoit une invitation :* Avec l'agent bob, copier/coller la résponse de l'invitation dans le body de l'enpoint /out-of-band/receive-invitation (POST):  
Body : 
```json
{
    "@type": "did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/out-of-band/1.0/invitation",
    "@id": "a40bb544-46b8-4aa0-bfe3-048e306b690b",
    "services": [
      {
        "id": "#inline",
        "type": "did-communication",
        "recipientKeys": [
          "did:key:z6Mkg6TynY8RWhqQWAgr8u67R1tFp9JVyqQkdJTw5FB4BBzm"
        ],
        "serviceEndpoint": "http://localhost:8000/"
      }
    ],
    "label": "Conf",
    "handshake_protocols": [
      "did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/didexchange/1.0"
    ]
  }
```
Réponse : 
```json
{
  "invitation_key": "2eCwCHszBALwPfr9TL8GZvLFza2eZxAPwHZ1EyD3FyDP",
  "their_role": "inviter",
  "their_label": "Conf",
  "connection_protocol": "didexchange/1.0",
  "created_at": "2021-12-24T14:35:58.120459Z",
  "rfc23_state": "invitation-received",
  "accept": "manual",
  "connection_id": "ed6e2de7-9f57-44ca-a921-56b80c16bdad",
  "routing_state": "none",
  "invitation_mode": "once",
  "state": "invitation",
  "updated_at": "2021-12-24T14:35:58.120459Z",
  "invitation_msg_id": "a40bb544-46b8-4aa0-bfe3-048e306b690b"
}
```
3. Bob accepte l'invitation :
- Exécuter l'end-point suivant : /didexchange/{conn_id}/accept-invitation 
- conn_id : Visible dans la réponse précédente (connection_id)

Réponse : 
```json
{
  "invitation_key": "2eCwCHszBALwPfr9TL8GZvLFza2eZxAPwHZ1EyD3FyDP",
  "their_role": "inviter",
  "their_label": "Conf",
  "my_did": "GULVoka7w2c9B6R2NdUDPP",
  "connection_protocol": "didexchange/1.0",
  "created_at": "2021-12-24T14:35:58.120459Z",
  "rfc23_state": "request-sent",
  "accept": "manual",
  "connection_id": "ed6e2de7-9f57-44ca-a921-56b80c16bdad",
  "routing_state": "none",
  "invitation_mode": "once",
  "state": "request",
  "updated_at": "2021-12-24T14:45:51.592911Z",
  "request_id": "6acc739a-b8d2-450d-9abc-d0e65489e07b",
  "invitation_msg_id": "a40bb544-46b8-4aa0-bfe3-048e306b690b"
}
```
4. Confédération accepte la demande de connexion : 
- Exécuter l'end-point suivant : /didexchange/{conn_id}/accept-request
- conn_id : Peut être récupéré en faisant un /connections (GET) ! connexion_id différent de bob !
Réponse : 
```json
{
  "updated_at": "2021-12-24T14:50:42.752988Z",
  "their_label": "Bob",
  "my_did": "VxkdcMLQv93HcGy8DhcAY7",
  "invitation_msg_id": "a40bb544-46b8-4aa0-bfe3-048e306b690b",
  "their_role": "invitee",
  "routing_state": "none",
  "invitation_mode": "once",
  "accept": "manual",
  "state": "response",
  "connection_protocol": "didexchange/1.0",
  "rfc23_state": "response-sent",
  "their_did": "GULVoka7w2c9B6R2NdUDPP",
  "request_id": "6acc739a-b8d2-450d-9abc-d0e65489e07b",
  "connection_id": "5b3f84bd-9e9b-4301-806e-8cfb659fca22",
  "created_at": "2021-12-24T14:28:40.076557Z",
  "invitation_key": "2eCwCHszBALwPfr9TL8GZvLFza2eZxAPwHZ1EyD3FyDP"
}
```
### Création d'un schéma : 
Depuis l'agent Confédération, exécutez l'end-point : "/schemas" (POST) :
Body : 
```json
{
    "attributes": [
      "nom",
      "prenom",
      "age",
      "genre",
      "taille",
      "origine"
    ],
    "schema_name": "identite",
    "schema_version": "1.1"
}
```
Réponse : 
```json
{
  "schema_id": "V1i1ptWQmQQCMrHQDz2PEe:2:identite:1.1",
  "schema": {
    "ver": "1.0",
    "id": "V1i1ptWQmQQCMrHQDz2PEe:2:identite:1.1",
    "name": "identite",
    "version": "1.1",
    "attrNames": [
      "nom",
      "prenom",
      "taille",
      "origine",
      "age",
      "genre"
    ],
    "seqNo": 11
  }
}
```
Créer une credential-definition : `/credential-definitions (POST)`
Body : 
```json
{
    "schema_id": "V1i1ptWQmQQCMrHQDz2PEe:2:identite:1.0",
    "tag": "default"
  }
```
Réponse : 
```json
{
  "credential_definition_id": "V1i1ptWQmQQCMrHQDz2PEe:3:CL:8:default"
}
```


### Création de l'endentité :
1. Bob envoie une proposition : `(POST) issue-credential-2.0/send-proposal`
Body : 
```json
{
  "auto_remove": true,
  "comment": "string",
  "connection_id": "cb98dd1a-ae8d-43f2-b3b7-95f10cf8109f",
  "credential_preview": {
    "@type": "issue-credential/2.0/credential-preview",
    "attributes": [
      {
        "mime-type": "plain/text",
        "name": "nom", 
        "value": "Schmidt"
      },
      {
        "mime-type": "plain/text",
        "name": "prenom", 
        "value": "Bob"
      },
      {
        "mime-type": "plain/text",
        "name": "age", 
        "value": "20"
      },
      {
        "mime-type": "plain/text",
        "name": "genre", 
        "value": "Masculin"
      },
      {
        "mime-type": "plain/text",
        "name": "taille", 
        "value": "178"
      },
      {
        "mime-type": "plain/text",
        "name": "origine", 
        "value": "Vendlincourt (JU)"
      }
    ]
  },
  "filter": {
    "indy": {
      "cred_def_id": "V1i1ptWQmQQCMrHQDz2PEe:3:CL:8:default",
      "schema_id": "V1i1ptWQmQQCMrHQDz2PEe:2:identite:1.0",
      "schema_name": "identite",
      "schema_version": "1.0"
    }
  },
  "trace": true
}
```
A adapter : 
- connexion_id
- schema_id
- cred_def_id (adapter avec le schema_id)
Réponse : 
```json
{
  "cred_proposal": {
    "@type": "did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/issue-credential/2.0/propose-credential",
    "@id": "8822cb39-37a5-4704-b488-1797d9a985f2",
    "~trace": {
      "target": "log",
      "full_thread": true,
      "trace_reports": []
    },
    "credential_preview": {
      "@type": "did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/issue-credential/2.0/credential-preview",
      "attributes": [
        {
          "name": "age",
          "mime-type": "plain/text",
          "value": "20"
        },
        {
          "name": "nom",
          "mime-type": "plain/text",
          "value": "Schmidt"
        },
        {
          "name": "prenom",
          "mime-type": "plain/text",
          "value": "Bob"
        }
      ]
    },
    "comment": "string",
    "filters~attach": [
      {
        "@id": "indy",
        "mime-type": "application/json",
        "data": {
          "base64": "eyJjcmVkX2RlZl9pZCI6ICJWMWkxcHRXUW1RUUNNckhRRHoyUEVlOjM6Q0w6OTpkZWZhdWx0IiwgInNjaGVtYV9pZCI6ICJWMWkxcHRXUW1RUUNNckhRRHoyUEVlOjI6aWRlbnRpdGU6MS4wIiwgInNjaGVtYV9uYW1lIjogImlkZW50aXRlIiwgInNjaGVtYV92ZXJzaW9uIjogIjEuMCJ9"
        }
      }
    ],
    "formats": [
      {
        "attach_id": "indy",
        "format": "hlindy/cred-filter@v2.0"
      }
    ]
  },
  "initiator": "self",
  "thread_id": "8822cb39-37a5-4704-b488-1797d9a985f2",
  "auto_offer": false,
  "state": "proposal-sent",
  "connection_id": "d7b3207b-3d08-4731-a609-ebe907ba4358",
  "cred_ex_id": "d57749d8-26fc-452f-8fe2-a75681606f3e",
  "by_format": {
    "cred_proposal": {
      "indy": {
        "cred_def_id": "V1i1ptWQmQQCMrHQDz2PEe:3:CL:9:default",
        "schema_id": "V1i1ptWQmQQCMrHQDz2PEe:2:identite:1.0",
        "schema_name": "identite",
        "schema_version": "1.0"
      }
    }
  },
  "trace": true,
  "auto_remove": true,
  "created_at": "2021-12-25T15:53:11.509586Z",
  "updated_at": "2021-12-25T15:53:11.509586Z",
  "role": "holder",
  "cred_preview": {
    "@type": "did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/issue-credential/2.0/credential-preview",
    "attributes": [
      {
        "name": "age",
        "mime-type": "plain/text",
        "value": "20"
      },
      {
        "name": "nom",
        "mime-type": "plain/text",
        "value": "Schmidt"
      },
      {
        "name": "prenom",
        "mime-type": "plain/text",
        "value": "Bob"
      }
    ]
  },
  "auto_issue": false
}
```
2. La confédération, répond à la proposition avec une offre. En exécutant l'endpoint `issue-credential-2.0/records/{cred_ex_id}/send-offer (POST)` : 
- Adapter le paramètre `cred_ex_id` avec le cred_ex_id de la confédération. Pour le récupérer : `issue-credential-2.0/records`

Body : `{}`
Réponse : 
```json
{
  "connection_id": "3832bc8a-f581-4450-85a3-3742fcf15442",
  "by_format": {
    "cred_proposal": {
      "indy": {
        "cred_def_id": "V1i1ptWQmQQCMrHQDz2PEe:3:CL:8:default",
        "schema_id": "V1i1ptWQmQQCMrHQDz2PEe:2:identite:1.0",
        "schema_name": "identite",
        "schema_version": "1.0"
      }
    },
    "cred_offer": {
      "indy": {
        "schema_id": "V1i1ptWQmQQCMrHQDz2PEe:2:identite:1.0",
        "cred_def_id": "V1i1ptWQmQQCMrHQDz2PEe:3:CL:8:default",
        "key_correctness_proof": {
          "c": "16528953790731506839689254985562775604512965296892277973072759598307735983352",
          "xz_cap": "62310528646574174577200144571766057194801492350979144019144121189769826494214404878604338700783658322066523638084761690906051924034111448802797571182392357855839017760781546576358263024648580860045143716877150265010855450333085440325596697126993476898458264028661088827969089493654145443737114199703121847980645821199076263619293257400157494651913299113393201943106368429665140724480382296667021399589998495671487819079945721329701268752832243650979475507986419479296489194610999932179178107527836522589517672918983164665048282184011088663581847267141117173371435115404543879320105427422299884579232805465265354460323708150616780157337007737663423501430594909911062450707047426651008201328717",
          "xr_cap": [
            [
              "age",
              "181727549608095645283394281116187627263750363554428881288064288402841086004808638900571024761160885060058773920026588059203740612099320859789288182043933604788377497018174708973847160977591023394458193225631630464969131881082137951699688968009499759626748615100373573002715342402571478234207126061576789532921239386264035974367010411195561237360935929290660563095775143871782074930482011243533498228439568194390142246026371484568992605952605096276613482271463924376418695877360404681152760237365248437608442014267129589598892145891507267218713789517820472756982947772499378872664546726217853627461639172238697133127900890324020493661528287869972805327159688040207779237947108965560212776584185"
            ],
            [
              "nom",
              "43334400365009303840983030476263600608479187019243647301302286100740762204502841638479337419324920122684387189362012077255749313526815032512708246598362488712812009056303840721952311280241527800134750518062261223038396579926623953876501027276349856444385146598069688484609934285706105467183740597930051171070701865899276867560914263439932956371519251511697462403978920993569524197148043341919254844908091113556588006063430359875509357240714909887938535279546025423113611566136594219342078521553059683371966670262793457349917949391983431042894111726084574120795753309918655477113475760153055857461070945311236359782629646420376687370855975651653348508831800752224775978973037284405386424575635"
            ],
            [
              "master_secret",
              "318048673302395106165662271300579868379435276316926991897186885092220715271140173013322981870445233116881383181337855378056478315573380510219215219786154960796322707207093686688073607853688916311812891867818760132461124492264342776963589565367803286310102845731246163089285414909898767998175001037433465333607069005858874112825995958290780110519154354835000351445190233640299721867352317364946235674546833713142408223030796078515960735972087257565257431528488095156821458954126230928817106096270443695821874796006666763321710066733377157775633233184613244277116680588274344853039286638580728394755766741347362282956188666693077555111388241504573396528606511057773576191661475717197958920639007"
            ],
            [
              "prenom",
              "292896547401867339214147760147635970431585161992890534393065133789339856952922024633821219328100782858099115798378352526769592934392316605244593693584226140886903591144172235183204713695637001846050042340750556457930530337831623612872039741019817590115674495836357946780873774759317447940441396714599705841609021337551555303528093429226061155738734936865576504175023698973352516762875343711774067596341573810266437447862347711802487012664101231829853474432444047384663602958225010822354008445551582285651843733185887065907154974852264919967733479540724080746578532062874079181694979350143786857432812249241877589134335511223609040272395600433088191998453529175206981227217553214042840070257342"
            ]
          ]
        },
        "nonce": "280943841766410467153210"
      }
    }
  },
  "cred_offer": {
    "@type": "did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/issue-credential/2.0/offer-credential",
    "@id": "3683c0a9-69a9-4289-9739-7e72e3ff1dc5",
    "~thread": {
      "thid": "fd466d36-b3f7-441b-ad26-1fdd7391db61"
    },
    "~trace": {
      "target": "log",
      "full_thread": true,
      "trace_reports": []
    },
    "offers~attach": [
      {
        "@id": "indy",
        "mime-type": "application/json",
        "data": {
          "base64": "eyJzY2hlbWFfaWQiOiAiVjFpMXB0V1FtUVFDTXJIUUR6MlBFZToyOmlkZW50aXRlOjEuMCIsICJjcmVkX2RlZl9pZCI6ICJWMWkxcHRXUW1RUUNNckhRRHoyUEVlOjM6Q0w6ODpkZWZhdWx0IiwgImtleV9jb3JyZWN0bmVzc19wcm9vZiI6IHsiYyI6ICIxNjUyODk1Mzc5MDczMTUwNjgzOTY4OTI1NDk4NTU2Mjc3NTYwNDUxMjk2NTI5Njg5MjI3Nzk3MzA3Mjc1OTU5ODMwNzczNTk4MzM1MiIsICJ4el9jYXAiOiAiNjIzMTA1Mjg2NDY1NzQxNzQ1NzcyMDAxNDQ1NzE3NjYwNTcxOTQ4MDE0OTIzNTA5NzkxNDQwMTkxNDQxMjExODk3Njk4MjY0OTQyMTQ0MDQ4Nzg2MDQzMzg3MDA3ODM2NTgzMjIwNjY1MjM2MzgwODQ3NjE2OTA5MDYwNTE5MjQwMzQxMTE0NDg4MDI3OTc1NzExODIzOTIzNTc4NTU4MzkwMTc3NjA3ODE1NDY1NzYzNTgyNjMwMjQ2NDg1ODA4NjAwNDUxNDM3MTY4NzcxNTAyNjUwMTA4NTU0NTAzMzMwODU0NDAzMjU1OTY2OTcxMjY5OTM0NzY4OTg0NTgyNjQwMjg2NjEwODg4Mjc5NjkwODk0OTM2NTQxNDU0NDM3MzcxMTQxOTk3MDMxMjE4NDc5ODA2NDU4MjExOTkwNzYyNjM2MTkyOTMyNTc0MDAxNTc0OTQ2NTE5MTMyOTkxMTMzOTMyMDE5NDMxMDYzNjg0Mjk2NjUxNDA3MjQ0ODAzODIyOTY2NjcwMjEzOTk1ODk5OTg0OTU2NzE0ODc4MTkwNzk5NDU3MjEzMjk3MDEyNjg3NTI4MzIyNDM2NTA5Nzk0NzU1MDc5ODY0MTk0NzkyOTY0ODkxOTQ2MTA5OTk5MzIxNzkxNzgxMDc1Mjc4MzY1MjI1ODk1MTc2NzI5MTg5ODMxNjQ2NjUwNDgyODIxODQwMTEwODg2NjM1ODE4NDcyNjcxNDExMTcxNzMzNzE0MzUxMTU0MDQ1NDM4NzkzMjAxMDU0Mjc0MjIyOTk4ODQ1NzkyMzI4MDU0NjUyNjUzNTQ0NjAzMjM3MDgxNTA2MTY3ODAxNTczMzcwMDc3Mzc2NjM0MjM1MDE0MzA1OTQ5MDk5MTEwNjI0NTA3MDcwNDc0MjY2NTEwMDgyMDEzMjg3MTciLCAieHJfY2FwIjogW1siYWdlIiwgIjE4MTcyNzU0OTYwODA5NTY0NTI4MzM5NDI4MTExNjE4NzYyNzI2Mzc1MDM2MzU1NDQyODg4MTI4ODA2NDI4ODQwMjg0MTA4NjAwNDgwODYzODkwMDU3MTAyNDc2MTE2MDg4NTA2MDA1ODc3MzkyMDAyNjU4ODA1OTIwMzc0MDYxMjA5OTMyMDg1OTc4OTI4ODE4MjA0MzkzMzYwNDc4ODM3NzQ5NzAxODE3NDcwODk3Mzg0NzE2MDk3NzU5MTAyMzM5NDQ1ODE5MzIyNTYzMTYzMDQ2NDk2OTEzMTg4MTA4MjEzNzk1MTY5OTY4ODk2ODAwOTQ5OTc1OTYyNjc0ODYxNTEwMDM3MzU3MzAwMjcxNTM0MjQwMjU3MTQ3ODIzNDIwNzEyNjA2MTU3Njc4OTUzMjkyMTIzOTM4NjI2NDAzNTk3NDM2NzAxMDQxMTE5NTU2MTIzNzM2MDkzNTkyOTI5MDY2MDU2MzA5NTc3NTE0Mzg3MTc4MjA3NDkzMDQ4MjAxMTI0MzUzMzQ5ODIyODQzOTU2ODE5NDM5MDE0MjI0NjAyNjM3MTQ4NDU2ODk5MjYwNTk1MjYwNTA5NjI3NjYxMzQ4MjI3MTQ2MzkyNDM3NjQxODY5NTg3NzM2MDQwNDY4MTE1Mjc2MDIzNzM2NTI0ODQzNzYwODQ0MjAxNDI2NzEyOTU4OTU5ODg5MjE0NTg5MTUwNzI2NzIxODcxMzc4OTUxNzgyMDQ3Mjc1Njk4Mjk0Nzc3MjQ5OTM3ODg3MjY2NDU0NjcyNjIxNzg1MzYyNzQ2MTYzOTE3MjIzODY5NzEzMzEyNzkwMDg5MDMyNDAyMDQ5MzY2MTUyODI4Nzg2OTk3MjgwNTMyNzE1OTY4ODA0MDIwNzc3OTIzNzk0NzEwODk2NTU2MDIxMjc3NjU4NDE4NSJdLCBbIm5vbSIsICI0MzMzNDQwMDM2NTAwOTMwMzg0MDk4MzAzMDQ3NjI2MzYwMDYwODQ3OTE4NzAxOTI0MzY0NzMwMTMwMjI4NjEwMDc0MDc2MjIwNDUwMjg0MTYzODQ3OTMzNzQxOTMyNDkyMDEyMjY4NDM4NzE4OTM2MjAxMjA3NzI1NTc0OTMxMzUyNjgxNTAzMjUxMjcwODI0NjU5ODM2MjQ4ODcxMjgxMjAwOTA1NjMwMzg0MDcyMTk1MjMxMTI4MDI0MTUyNzgwMDEzNDc1MDUxODA2MjI2MTIyMzAzODM5NjU3OTkyNjYyMzk1Mzg3NjUwMTAyNzI3NjM0OTg1NjQ0NDM4NTE0NjU5ODA2OTY4ODQ4NDYwOTkzNDI4NTcwNjEwNTQ2NzE4Mzc0MDU5NzkzMDA1MTE3MTA3MDcwMTg2NTg5OTI3Njg2NzU2MDkxNDI2MzQzOTkzMjk1NjM3MTUxOTI1MTUxMTY5NzQ2MjQwMzk3ODkyMDk5MzU2OTUyNDE5NzE0ODA0MzM0MTkxOTI1NDg0NDkwODA5MTExMzU1NjU4ODAwNjA2MzQzMDM1OTg3NTUwOTM1NzI0MDcxNDkwOTg4NzkzODUzNTI3OTU0NjAyNTQyMzExMzYxMTU2NjEzNjU5NDIxOTM0MjA3ODUyMTU1MzA1OTY4MzM3MTk2NjY3MDI2Mjc5MzQ1NzM0OTkxNzk0OTM5MTk4MzQzMTA0Mjg5NDExMTcyNjA4NDU3NDEyMDc5NTc1MzMwOTkxODY1NTQ3NzExMzQ3NTc2MDE1MzA1NTg1NzQ2MTA3MDk0NTMxMTIzNjM1OTc4MjYyOTY0NjQyMDM3NjY4NzM3MDg1NTk3NTY1MTY1MzM0ODUwODgzMTgwMDc1MjIyNDc3NTk3ODk3MzAzNzI4NDQwNTM4NjQyNDU3NTYzNSJdLCBbIm1hc3Rlcl9zZWNyZXQiLCAiMzE4MDQ4NjczMzAyMzk1MTA2MTY1NjYyMjcxMzAwNTc5ODY4Mzc5NDM1Mjc2MzE2OTI2OTkxODk3MTg2ODg1MDkyMjIwNzE1MjcxMTQwMTczMDEzMzIyOTgxODcwNDQ1MjMzMTE2ODgxMzgzMTgxMzM3ODU1Mzc4MDU2NDc4MzE1NTczMzgwNTEwMjE5MjE1MjE5Nzg2MTU0OTYwNzk2MzIyNzA3MjA3MDkzNjg2Njg4MDczNjA3ODUzNjg4OTE2MzExODEyODkxODY3ODE4NzYwMTMyNDYxMTI0NDkyMjY0MzQyNzc2OTYzNTg5NTY1MzY3ODAzMjg2MzEwMTAyODQ1NzMxMjQ2MTYzMDg5Mjg1NDE0OTA5ODk4NzY3OTk4MTc1MDAxMDM3NDMzNDY1MzMzNjA3MDY5MDA1ODU4ODc0MTEyODI1OTk1OTU4MjkwNzgwMTEwNTE5MTU0MzU0ODM1MDAwMzUxNDQ1MTkwMjMzNjQwMjk5NzIxODY3MzUyMzE3MzY0OTQ2MjM1Njc0NTQ2ODMzNzEzMTQyNDA4MjIzMDMwNzk2MDc4NTE1OTYwNzM1OTcyMDg3MjU3NTY1MjU3NDMxNTI4NDg4MDk1MTU2ODIxNDU4OTU0MTI2MjMwOTI4ODE3MTA2MDk2MjcwNDQzNjk1ODIxODc0Nzk2MDA2NjY2NzYzMzIxNzEwMDY2NzMzMzc3MTU3Nzc1NjMzMjMzMTg0NjEzMjQ0Mjc3MTE2NjgwNTg4Mjc0MzQ0ODUzMDM5Mjg2NjM4NTgwNzI4Mzk0NzU1NzY2NzQxMzQ3MzYyMjgyOTU2MTg4NjY2NjkzMDc3NTU1MTExMzg4MjQxNTA0NTczMzk2NTI4NjA2NTExMDU3NzczNTc2MTkxNjYxNDc1NzE3MTk3OTU4OTIwNjM5MDA3Il0sIFsicHJlbm9tIiwgIjI5Mjg5NjU0NzQwMTg2NzMzOTIxNDE0Nzc2MDE0NzYzNTk3MDQzMTU4NTE2MTk5Mjg5MDUzNDM5MzA2NTEzMzc4OTMzOTg1Njk1MjkyMjAyNDYzMzgyMTIxOTMyODEwMDc4Mjg1ODA5OTExNTc5ODM3ODM1MjUyNjc2OTU5MjkzNDM5MjMxNjYwNTI0NDU5MzY5MzU4NDIyNjE0MDg4NjkwMzU5MTE0NDE3MjIzNTE4MzIwNDcxMzY5NTYzNzAwMTg0NjA1MDA0MjM0MDc1MDU1NjQ1NzkzMDUzMDMzNzgzMTYyMzYxMjg3MjAzOTc0MTAxOTgxNzU5MDExNTY3NDQ5NTgzNjM1Nzk0Njc4MDg3Mzc3NDc1OTMxNzQ0Nzk0MDQ0MTM5NjcxNDU5OTcwNTg0MTYwOTAyMTMzNzU1MTU1NTMwMzUyODA5MzQyOTIyNjA2MTE1NTczODczNDkzNjg2NTU3NjUwNDE3NTAyMzY5ODk3MzM1MjUxNjc2Mjg3NTM0MzcxMTc3NDA2NzU5NjM0MTU3MzgxMDI2NjQzNzQ0Nzg2MjM0NzcxMTgwMjQ4NzAxMjY2NDEwMTIzMTgyOTg1MzQ3NDQzMjQ0NDA0NzM4NDY2MzYwMjk1ODIyNTAxMDgyMjM1NDAwODQ0NTU1MTU4MjI4NTY1MTg0MzczMzE4NTg4NzA2NTkwNzE1NDk3NDg1MjI2NDkxOTk2NzczMzQ3OTU0MDcyNDA4MDc0NjU3ODUzMjA2Mjg3NDA3OTE4MTY5NDk3OTM1MDE0Mzc4Njg1NzQzMjgxMjI0OTI0MTg3NzU4OTEzNDMzNTUxMTIyMzYwOTA0MDI3MjM5NTYwMDQzMzA4ODE5MTk5ODQ1MzUyOTE3NTIwNjk4MTIyNzIxNzU1MzIxNDA0Mjg0MDA3MDI1NzM0MiJdXX0sICJub25jZSI6ICIyODA5NDM4NDE3NjY0MTA0NjcxNTMyMTAifQ=="
        }
      }
    ],
    "credential_preview": {
      "@type": "did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/issue-credential/2.0/credential-preview",
      "attributes": [
        {
          "name": "age",
          "mime-type": "plain/text",
          "value": "20"
        },
        {
          "name": "nom",
          "mime-type": "plain/text",
          "value": "Schmidt"
        },
        {
          "name": "prenom",
          "mime-type": "plain/text",
          "value": "Bob"
        }
      ]
    },
    "formats": [
      {
        "attach_id": "indy",
        "format": "hlindy/cred-abstract@v2.0"
      }
    ]
  },
  "trace": true,
  "cred_ex_id": "9f9884ec-35f3-4cc8-99b1-b409b65ae5d9",
  "auto_remove": true,
  "created_at": "2021-12-26T08:18:30.868673Z",
  "state": "offer-sent",
  "updated_at": "2021-12-26T08:21:28.503910Z",
  "cred_proposal": {
    "@type": "did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/issue-credential/2.0/propose-credential",
    "@id": "fd466d36-b3f7-441b-ad26-1fdd7391db61",
    "~trace": {
      "target": "log",
      "full_thread": true,
      "trace_reports": []
    },
    "filters~attach": [
      {
        "@id": "indy",
        "mime-type": "application/json",
        "data": {
          "base64": "eyJjcmVkX2RlZl9pZCI6ICJWMWkxcHRXUW1RUUNNckhRRHoyUEVlOjM6Q0w6ODpkZWZhdWx0IiwgInNjaGVtYV9pZCI6ICJWMWkxcHRXUW1RUUNNckhRRHoyUEVlOjI6aWRlbnRpdGU6MS4wIiwgInNjaGVtYV9uYW1lIjogImlkZW50aXRlIiwgInNjaGVtYV92ZXJzaW9uIjogIjEuMCJ9"
        }
      }
    ],
    "comment": "string",
    "credential_preview": {
      "@type": "did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/issue-credential/2.0/credential-preview",
      "attributes": [
        {
          "name": "age",
          "mime-type": "plain/text",
          "value": "20"
        },
        {
          "name": "nom",
          "mime-type": "plain/text",
          "value": "Schmidt"
        },
        {
          "name": "prenom",
          "mime-type": "plain/text",
          "value": "Bob"
        }
      ]
    },
    "formats": [
      {
        "attach_id": "indy",
        "format": "hlindy/cred-filter@v2.0"
      }
    ]
  },
  "role": "issuer",
  "cred_preview": {
    "@type": "did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/issue-credential/2.0/credential-preview",
    "attributes": [
      {
        "name": "age",
        "mime-type": "plain/text",
        "value": "20"
      },
      {
        "name": "nom",
        "mime-type": "plain/text",
        "value": "Schmidt"
      },
      {
        "name": "prenom",
        "mime-type": "plain/text",
        "value": "Bob"
      }
    ]
  },
  "thread_id": "fd466d36-b3f7-441b-ad26-1fdd7391db61",
  "initiator": "external"
}
```


cccfe0ed-2ed6-4a5d-9709-97ef624b090e






## WEB APP
### Get started
1. Installations (Git, NPM, Angular)
```bash
sudo apt-get install git-all
sudo apt install npm
sudo apt install nodejs
sudo npm cache clean -f
sudo npm install -g n
sudo n stable
sudo npm install -g @angular/cli
```
2. Clone du projet :
```bash
git clone https://github.com/TChriste/e-id-app.git
cd e-id-app
```

3. Installation et démarrage
```bash
npm install
ng serve --open
```
4. Application accessible à l'adresse : http://localhost:4200/ :

