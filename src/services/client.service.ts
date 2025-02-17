// import Client from "../schemes/client.scheme";
// import  Auth_Log  from "../schemes/auth_log.scheme";

// export class ClientService {
//     static async addClient(clientData: any, req: any, header: any) {

// // Route only for OWNER role !!!!!!!!!!!!!!!
// const role = req.role.split('|');
// if(role.find((element: string) => element == "OWNER") === "OWNER"){null}else{
//     const timestamp: number = Math.floor(Date.now() / 1000);
//     const userAgent: Text = header.headers['user-agent']
//     const auth_Log = await Auth_Log.create({
//         login_attempt: timestamp,
//         ip_adresse: header.connection.remoteAddress,
//         user_agent: userAgent,
//         status: "failure",
//         reason: "unauthorized: " + header.url,
//         authId: header.auth.userId
//       });
//     return { error: "Accès interdit : vous devez être OWNER." };
// }

// // Check company.name and contact.email -> required
// if(clientData.company.name == ""){return {error : "Le champ company.name est obligatoire." }}
// if(clientData.contact.email == ""){return {error : "Le champ contact.email est obligatoire." }}

// // Check company.type {PARTICULIER | ASSOCIATION | ENTREPRISE}
// if (!["PARTICULIER", "ASSOCIATION", "ENTREPRISE"].includes(clientData.company.type)) {
//     return { error: "Le champ company.type doit être 'PARTICULIER', 'ASSOCIATION' ou 'ENTREPRISE'." };
//   }

// const createClient = await Client.create({
//     name: clientData.company.name,
//     type: clientData.company.type,
//     siret: clientData.company.siret,
//     tva: clientData.company.tva,
//     website: clientData.company.website,
//     adresse: clientData.address.address,
//     city: clientData.address.city,
//     postal: clientData.address.postal,
//     country: clientData.address.country,
//     contact: clientData.contact.name,
//     email: clientData.contact.email,
//     note: clientData.contact.note,
//     phone: clientData.contact.tel,
//     isActive: clientData.status.isActive
//   });
//   return createClient.dataValues;
  

//     }


// }