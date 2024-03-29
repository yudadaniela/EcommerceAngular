import { Injectable } from '@angular/core';
import { Region, SmallCountry, Country } from '../Models/country-interface';
import { Observable, of, tap, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private baseUrl: string = 'https://restcountries.com/v3.1';

  private _regions: Region[] = [
    Region.Africa,
    Region.Americas,
    Region.Asia,
    Region.Europe,
    Region.Oceania,
  ];

  constructor(private http: HttpClient) {}
  /**
   *push in array the continent parameters
   */
  get regions(): Region[] {
    return [...this._regions];
  }
  /**
   *
   * @param region the parameter the type Region 
   * @returns a map whit the name of the country, country borders and currency 
   */
  getCountriesByRegion(region: Region): Observable<SmallCountry[]> {
    if (!region) return of([]);
    const url: string = `${this.baseUrl}/region/${region}?fields=cca3,name,borders,currencies`;
    return this.http.get<Country[]>(url).pipe(
      map((countries) =>
        countries.map((country) => ({
          name: country.name.common,
          cca3: country.cca3,
          borders: country.borders ?? [], //operador de covalencia nula, evalua si es nulo
          currency: country.currencies,
        }))
      ) //regreza lo que nosotros queramos, transforma la data
    );
  }
  /**
   * 
   * @param alphaCode 
   * @returns 
   */
  getCountryAlphaCode(alphaCode: string): Observable<SmallCountry> {
    const url = `${this.baseUrl}/alpha/${alphaCode}?fields=cca3,name,borders,currencies`;
    return this.http.get<Country>(url).pipe(
      map((country) => ({
        name: country.name.common,
        cca3: country.cca3,
        borders: country.borders ?? [],
        currencies: country.currencies,
      }))
    );
  }
}
