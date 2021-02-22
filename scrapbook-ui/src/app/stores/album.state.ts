import { State, Action, StateContext, Selector, Select, Store } from '@ngxs/store';
import { Injectable, Inject } from '@angular/core';
import { OpenProfile, CloseProfile, SetPageError, CloseUpload, CloseLoading, OpenImageModal, OpenUploadingPanel, OpenLoading } from '../actions/ui.actions';
import { OpenAlbumInfo, CloseAlbumInfo, FetchAllAlbums, FetchAllAlbumsOfUser, CreateAlbum, Upload, PutAlbumInView, RemoveAlbumFromView, GetImage, RemoveImage, DownloadImage, RemoveUploadPanel, FetchImagesOfAlbum, DownloadAlbum, SelectMultipleImages, RemoveSelectedImage, DownloadSelectedImages, DeleteSelectedImages, RemoveAllSelectedImages, AddAlbumCollaborator, RemoveAlbumCollaborator, EditAlbumSettings } from '../actions/album.actions';
import { AlbumService } from '../services/album.service';
import { tap, catchError, mergeMap } from 'rxjs/operators';
import { Album } from '../models/album.model';
import { Image, PendingUploadsState, UPLOAD_STATE, PendingUploadsStateInterface } from '../models/image.model';
import { of, from, throwError, forkJoin} from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageService } from '../services/image.service';
import { patch, updateItem } from '@ngxs/store/operators';
import { User } from '../models/user.model';
import { RemoveSearchedUserBySubString } from '../actions/user.actions';

export class AlbumStateModel {
  albumInfoOpen: boolean;
  albumInfoModalData: Album | Image;
  imageInfoOpen: boolean;
  allAlbumsOfUser: Array<Album>;
  albumInView: Album;
  image: any;
  imgBlob: Blob;
  pendingUploads: Array<PendingUploadsStateInterface>;
  selectedImages: Array<Image>;
  collaborators: Array<User[]>;
}

@State<AlbumStateModel>({
  name: 'albumState',
  defaults: {
    albumInfoOpen: false,
    imageInfoOpen: false,
    albumInfoModalData: {},
    allAlbumsOfUser: [],
    albumInView: null,
    image: null,
    imgBlob: null,
    pendingUploads: [],
    selectedImages: [],
    collaborators: []
  }
})
@Injectable()
export class AlbumState {
  constructor(public albumService: AlbumService, public store: Store, private sanitizer: DomSanitizer, public imageService: ImageService) {}

  @Selector()
  static getInfoModalState(state: AlbumStateModel) {
    return state.albumInfoOpen;
  }

  @Selector()
  static getAlbumnInfoModalData(state: AlbumStateModel) {
    return state.albumInfoModalData;
  }

  @Selector()
  static getAllAlbumsOfUser(state: AlbumStateModel) {
    return state.allAlbumsOfUser;
  }

  @Selector()
  static getAlbumInView(state: AlbumStateModel) {
    return state.albumInView;
  }

  @Selector()
  static getImageSrc(state: AlbumStateModel) {
    return state.image;
  }

  @Selector()
  static getUploadPanelPendingArray(state: AlbumStateModel) {
    return state.pendingUploads;
  }

  @Selector()
  static getSelectedImageState(state: AlbumStateModel) {
    return state.selectedImages;
  }

  @Action(OpenAlbumInfo)
  openAlbumInfo({getState, setState}: StateContext<AlbumStateModel>, {data , type}: OpenAlbumInfo) {
    const state = getState();

    if (type) {
      setState({
        ...state,
        albumInfoOpen: true,
        albumInfoModalData: data
      });
    } else {
      setState({
        ...state,
        albumInfoOpen: true,
        albumInfoModalData: data
      });
    }

  }

  @Action(CloseAlbumInfo)
  closeAlbumInfo({getState, setState}: StateContext<AlbumStateModel>) {
    setState({
      ...getState(),
      albumInfoOpen: false
    });
  }
  @Action(FetchAllAlbumsOfUser)
  fetchAllAlbumsOfUser({getState, setState, dispatch}: StateContext<AlbumStateModel>, {id}: FetchAllAlbumsOfUser) {
    const state = getState();

    return this.albumService.getAlbumsOfUser(id).pipe(
      tap((response: Album[]) => {

        dispatch(new CloseLoading());
        setState({
           ...state,
           allAlbumsOfUser: response
         });
      }),
      catchError((err) => {
        dispatch(new SetPageError('401'));
        return of(JSON.stringify(err))
      })
    );
  }

  @Action(CreateAlbum)
  createAlbum({getState, setState, dispatch}: StateContext<AlbumStateModel>, {name, desc}: CreateAlbum) {
    const state = getState();
    const userid = localStorage.getItem('scrapbook-userid')
    return this.albumService.createAlbum(name, userid, desc).pipe(
      tap((response: Album) => {
        dispatch(new CloseLoading());
        setState({
          ...state,
          allAlbumsOfUser: [...state.allAlbumsOfUser, response]
        });
      })
    );
  }

  @Action(Upload)
  uploadFiles({getState, setState, dispatch, patchState}: StateContext<AlbumStateModel>, {files, id}: Upload) {
    const userid = localStorage.getItem('scrapbook-userid')
    patchState({
      pendingUploads: []
    });
    dispatch(new OpenUploadingPanel());
    dispatch(new CloseUpload());
    const albumInView = getState().albumInView;


    const uploads: Array<PendingUploadsState> = [];
    files.forEach((file) => {
      uploads.push(new PendingUploadsState(file, file.name, UPLOAD_STATE.progress));
    });

    patchState({
      pendingUploads: uploads
    });

    const fetch$ = (obj) => {
      return this.albumService.uploadFile(obj.file, id, userid).pipe(
        tap(res => {
          setState(
            patch({
              pendingUploads: updateItem((i: PendingUploadsStateInterface) => i.name === obj.name, patch({...obj, status: UPLOAD_STATE.done}))
            }),
          );
          if(albumInView) {
            setState({
              ...getState(),
              albumInView: {...albumInView, images: [...albumInView.images, res]}
            })
          }
        }),
        catchError(error => {
          setState(
            patch({
              pendingUploads: updateItem((i: PendingUploadsStateInterface) => i.name === obj.name, patch({...obj, status: UPLOAD_STATE.fail}))
            })
          );
          console.log('err:', error.message, obj);
          return of(undefined);
        })
      );
    };

    forkJoin(uploads.map(fetch$)).subscribe(_ => {
    });

  }


  @Action(PutAlbumInView)
  putAlbumInView({getState, setState, dispatch}: StateContext<AlbumStateModel>, {id}: PutAlbumInView) {
    const state = getState();
    return this.albumService.getAlbumByID(id).pipe(
      tap((res: Album) => {
        setState({
          ...state,
          albumInView: res
        })
        dispatch(new FetchImagesOfAlbum(res.googleDriveId))
      }),
      catchError((err) => {
        dispatch(new SetPageError('401'));
        return of(JSON.stringify(err))
      })
    )
  }

  @Action(FetchImagesOfAlbum)
  fetchImagesOfAlbum({getState, setState, dispatch}: StateContext<AlbumStateModel>, {googleDriveId}:FetchImagesOfAlbum) {
    const state = getState();
    const album = state.albumInView;
    return this.albumService.getAllImagesOfAlbum(googleDriveId).pipe(
        tap((res: Image[]) => {
          setState({
            ...state,
            albumInView: {...album, images: res}
          });
        }),
        catchError((err) => {
          dispatch(new SetPageError('500'));
          return of(JSON.stringify(err));
        })
      );
  }

  @Action(RemoveAlbumFromView)
  removeAlbumFromView({getState, setState, dispatch}: StateContext<AlbumStateModel>) {
    setState({
      ...getState(),
      albumInView: null
    });
  }

  @Action(GetImage)
  getImage({getState, setState, dispatch}: StateContext<AlbumStateModel>, {id}: GetImage) {
    const state = getState();
    dispatch(new OpenImageModal());
    dispatch(new RemoveImage());

    return this.albumService.getImage(id).pipe(
      tap((res) => {
        const blob = new Blob([res] );

        setState({
          ...state,
          imgBlob: blob,
          image: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(blob))
        });
      })
    );
  }

  @Action(RemoveImage)
  removeImage({getState, setState, dispatch}: StateContext<AlbumStateModel>) {
    setState({
      ...getState(),
      image: null,
      imgBlob: null
    });
  }

  @Action(DownloadImage)
  downloadImage({getState, setState, dispatch}: StateContext<AlbumStateModel>, {img, name}: DownloadImage) {
    const state = getState();
    this.imageService.downloadImage(img, name, state.imgBlob);
  }

  @Action(RemoveUploadPanel)
  removeUploadQueue({getState, setState, dispatch}: StateContext<AlbumStateModel>) {
    setState({
      ...getState(),
      pendingUploads: []
    });
  }

  @Action(DownloadAlbum)
  downloadAlbum({getState, setState, dispatch}: StateContext<AlbumStateModel>, {albums}: DownloadAlbum) {
    const state = getState();
    dispatch(new OpenLoading());
    this.albumService.downloadAlbum(albums)
  }

  @Action(SelectMultipleImages)
  selectmultipleImages({getState, setState, dispatch}: StateContext<AlbumStateModel>, {image}:SelectMultipleImages) {
    const state = getState();
    setState({
      ...state,
      selectedImages: [...state.selectedImages, image]
    })
  }

  @Action(RemoveSelectedImage)
  removeSelectedImage({getState, setState, dispatch}: StateContext<AlbumStateModel>, {image}:SelectMultipleImages) {
    const state = getState();
    setState({
      ...state,
      selectedImages: state.selectedImages.filter(i => i.id !== image.id)
    })
  }

  @Action(DownloadSelectedImages)
  downloadSelectedImages({getState, setState, dispatch}: StateContext<AlbumStateModel>,) {
    const state = getState();
    const selectedImages = state.selectedImages;
    this.imageService.downloadMultipleImages(selectedImages, state.albumInView)
  }

  @Action(DeleteSelectedImages)
  deleteSelectedImages({getState, setState, dispatch}: StateContext<AlbumStateModel>,) {
    const state = getState();
    const selectedImages = state.selectedImages;
    
    // this.imageService.downloadMultipleImages(selectedImages)
  }

  @Action(RemoveAllSelectedImages)
  removeAllSelectedImages({getState, setState, dispatch}: StateContext<AlbumStateModel>,) {
    const state = getState();
    setState({
      ...state,
      selectedImages: []
    })
    
    // this.imageService.downloadMultipleImages(selectedImages)
  }

  @Action(AddAlbumCollaborator)
  addCollaborator({getState, setState, dispatch}: StateContext<AlbumStateModel>, {collabUser, owner}: AddAlbumCollaborator) {
    const state = getState();
    return this.albumService.addCollaborator(collabUser._id, owner._id, state.albumInView.googleDriveId).pipe(
      tap((res: Album) => {
        dispatch(new RemoveSearchedUserBySubString())
        setState({
          ...state,
          albumInView: {...state.albumInView, collaborators: res.collaborators}
        })
      }),
      catchError((err) => {
        return of(JSON.stringify(err))
      })
    )
  }

  @Action(RemoveAlbumCollaborator)
  removeCollaborator({getState, setState, dispatch}: StateContext<AlbumStateModel>, {collabUser, owner}: RemoveAlbumCollaborator) {
    const state = getState();
    return this.albumService.removeCollaborator(collabUser._id, owner._id, state.albumInView.googleDriveId).pipe(
      tap((res: Album) => {
        setState({
          ...state,
          albumInView:  {...state.albumInView, collaborators: res.collaborators}
        })
      }),
      catchError((err) => {
        return of(JSON.stringify(err))
      })
    )
  }

  @Action(EditAlbumSettings)
  editAlbumSettings({getState, setState, dispatch}: StateContext<AlbumStateModel>, {name, desc}: EditAlbumSettings) {
    dispatch(new OpenLoading())
    const state = getState();
    const uid = state.albumInView.createdBy._id;
    const gid = state.albumInView.googleDriveId;
    return this.albumService.editAlbumSettings(name, desc, uid, gid).pipe(
      tap((res: Album) => {
        dispatch(new CloseLoading())
        setState({
          ...state,
          albumInView: {...state.albumInView, name: res.name, description: res.description}
        })
      }),
      catchError((err) => {
        return of(JSON.stringify(err))
      })
    )
  }
}
