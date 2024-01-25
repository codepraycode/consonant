import Typesense from 'typesense';


// const env = process.env;


// const host = env['NEXT_PUBLIC_TYPESESNSE_API'];
// let port:string | number | undefined = env['NEXT_PUBLIC_TYPESESNSE_API_PORT'];
// const protocol = env['NEXT_PUBLIC_TYPESESNSE_API_PROTOCOL'] || 'http';



// if (!host) logger.error("TYPSESNSE LIG:: 'host' not resolved in env")
// if (!port) logger.error("TYPSESNSE LIG:: 'port' not resolved in env")
// if (!protocol) logger.error("TYPSESNSE LIG:: 'protocol' not resolved in env")


// if (port) {
//   port = Number(port);
// }


// let host = 'localhost';
// let port = 8108;
// let protocol = 'http';
// let apiKey = 'xzy';

let host = 'ijkhmdwprn042bsxp-1.a1.typesense.net';
let port = 443
let protocol = 'https'
let apiKey = 'ivqLeC3srUz1XfneA4233Y4Irh6dUDPW';

const Searcher = new Typesense.Client({
  nodes: [
    {
      host,
      port,
      protocol,
    },
  ],
  apiKey,
  connectionTimeoutSeconds: 2,
});

export default Searcher;
