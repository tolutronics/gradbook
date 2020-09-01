import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
 { path: '', redirectTo: 'signin', pathMatch: 'full' },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'signin',
    loadChildren: () => import('./sigin/sigin.module').then( m => m.SiginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'post',
    loadChildren: () => import('./post/post.module').then( m => m.PostPageModule)
  },
  {
    path: 'postdetail',
    loadChildren: () => import('./postdetail/postdetail.module').then( m => m.PostdetailPageModule)
  },
  {
    path: 'matedetail',
    loadChildren: () => import('./matedetail/matedetail.module').then( m => m.MatedetailPageModule)
  },
  {
    path: 'tab4',
    loadChildren: () => import('./tab4/tab4.module').then( m => m.Tab4PageModule)
  },
  {
    path: 'chatpage',
    loadChildren: () => import('./chatpage/chatpage.module').then( m => m.ChatpagePageModule)
  },
  {
    path: 'drafts',
    loadChildren: () => import('./drafts/drafts.module').then( m => m.DraftsPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
