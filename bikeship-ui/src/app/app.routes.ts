import { Routes } from '@angular/router';
import { MapKomponent } from './components/map-component/map.component';
import { MainpageComponent } from './components/mainpage/mainpage.component';
import { ProfilepageComponent } from './components/profilepage/profilepage.component';
import { BikerpageComponent } from './components/bikerpage/bikerpage.component';

export const routes: Routes = [
    {path: '', component: MainpageComponent},
    {path: 'map', component: MapKomponent},
    {path: 'profile', component: ProfilepageComponent},
    {path: 'biker', component: BikerpageComponent}
];
