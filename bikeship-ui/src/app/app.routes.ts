import { Routes } from '@angular/router';
import { TestComponent } from './components/test-component/test.component';
import { MapKomponent } from './components/map-component/map.component';

export const routes: Routes = [
    {path: 'test', component: TestComponent},
    {path: 'map', component: MapKomponent},
];
