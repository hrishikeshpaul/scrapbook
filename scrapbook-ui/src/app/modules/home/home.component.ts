import { Component, OnInit } from '@angular/core';
import { FetchUserData } from 'src/app/actions/user.actions';
import { Store, Select } from '@ngxs/store';
import { FetchAllAlbumsOfUser, PutAlbumInView } from 'src/app/actions/album.actions';
import { UserState } from 'src/app/stores/user.state';
import { AlbumState } from 'src/app/stores/album.state';
import { Observable } from 'rxjs';
import { Album } from 'src/app/models/album.model';
import { Router } from '@angular/router';
import { AlbumListService } from '../album-list/album-list.service';
import { AlbumViewService } from '../album-view/album-view.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  @Select(AlbumState.getAllAlbumsOfUser) userAlbums$: Observable<Album[]>;
  @Select(AlbumState.getAlbumInView) albumInView$: Observable<Album>;

  albumName: string;

  constructor(public store: Store, public albumListService: AlbumListService, public router: Router, public albumViewService: AlbumViewService) { 
    this.userAlbums$.subscribe(data => {
      if (data) {
        this.albumListService.data$.next(data);
      }
    })
    
    this.albumInView$.subscribe(data => {
       if (data) {
        this.albumName = data.name;
        this.albumViewService.album$.next(data);
       }
    })
    // 
    
  }

  ngOnInit(): void {
    if (this.router.url === '/home') {
      const userID = this.store.selectSnapshot(UserState.getUserData)._id
      this.store.dispatch(new FetchAllAlbumsOfUser(userID))
    } else {
      const splitRoute = this.router.url.split('/')
      const albumId = splitRoute[splitRoute.length - 1];
      // get data for that route
      this.store.dispatch(new PutAlbumInView(albumId))
    }
    // this.store.dispatch(new FetchUserData(''))
  }

}
