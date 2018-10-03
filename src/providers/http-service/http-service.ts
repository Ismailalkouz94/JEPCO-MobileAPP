import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { PublicVarProvider } from '../../providers/public-var/public-var';
import { Network } from '@ionic-native/network';


@Injectable()
export class HttpServiceProvider {

  public headers: Headers = new Headers();
  private options: RequestOptions = new RequestOptions();
  private path;

  constructor(private http: Http
    , private network: Network) {
    // PublicVarProvider.setServiceUrl('http://192.162.1.115:8080/');
  }

  async http_request(request_options: any): Promise<any> {

    let response: any;

    //check internet connection
    let conntype = this.network.type;
    let status = conntype && conntype !== 'unknown' && conntype !== 'none';

    if(status==false)
    {
      response = { status: 100, key: "no_internet_connection" }
      return response;
    }

    this.options.headers = this.headers;
    this.options.method = request_options.method;
    if (request_options.body) {
      this.options.body = request_options.body;
    }
    this.path = request_options.path;
    let http_response = await this.http.request('http://217.144.0.210:8085/JepcoMobApi/'
    + this.path, this.options)
      // let http_response = await this.http.request('http://192.168.1.15:8080/JepcoMobApi/' +  this.path,  this.options)
      // let http_response = await this.http.request('http://212.118.22.172:8080/JepcoMobApi/' +  this.path,  this.options)
      // let http_response = await this.http.request('http://192.168.100.195:8080/JepcoMobApi/' +  this.path,  this.options)

      .toPromise()
      .then(response => response)
      .catch((err: any) => {
        
        switch (err.status) {
          case 401:
            response = err.json();
            break;
          case 500:
            response = { status: err.status, key: "system_error" }
            break;
          default:
            response = err.json();
            break;
        }
        return response;
      });

    return http_response;
  }

  async getJSON(url: string): Promise<any> {
    let http_response = await this.http.get("assets/" + url).toPromise().then(response => response.json());
    return http_response;
  }

}
