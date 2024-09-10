import { Routes } from '@angular/router';
import { MapKomponent } from './components/map-component/map.component';
import { MainpageComponent } from './components/mainpage/mainpage.component';

export const routes: Routes = [
    {path: '', component: MainpageComponent},
    {path: 'map', component: MapKomponent},
];
