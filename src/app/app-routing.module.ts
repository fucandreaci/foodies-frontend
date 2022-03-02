import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NewPostComponent } from './post/new-post/new-post.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProfiloComponent } from './profilo/profilo.component';
import { AuthGuardService } from './services/auth-guard.service';
import { SignUpComponent } from './sign-up/sign-up.component';
import { EditPostComponent } from './post/edit-post/edit-post.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
	{ path: 'signup', component: SignUpComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardService]},
  { path: 'profilo', component: ProfiloComponent, canActivate: [AuthGuardService]},
  { path: 'new_post', component: NewPostComponent, canActivate: [AuthGuardService] },
  { path: 'edit_post', component: EditPostComponent, canActivate: [AuthGuardService] },
  // { path: 'home', component: HomeComponent },
  { path: 'not_found', component: NotFoundComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/not_found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
