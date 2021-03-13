import { Image } from '../models/image.model';
import { Album } from '../models/album.model';
import { User } from '../models/user.model';
import { Filters, ImageFilters, SelectedImageFilters } from "../models/search.model";

export class FetchAllAlbums {
  static readonly type = '[FETCH] Fetch All Albums';
  constructor() {}
}

export class OpenAlbumInfo {
  static readonly type = '[OPEN] Album Info';
  constructor(public data: Album | Image, public type?: string) {}
}

export class CloseAlbumInfo {
  static readonly type = '[CLOSE] Album Info';
  constructor() {}
}

export class SelectAlbums {
  static readonly type = '[SELECT] Albums';
  constructor(public albumId: string){}
}

export class FetchAllAlbumsOfUser {
  static readonly type = '[FETCH] Fetch All Albums Of User';
  constructor(public id: string) {}
}

export class CreateAlbum {
  static readonly type = '[FETCH] Create Album';
  constructor(public name: string, public desc?: string) {}
}

export class Upload {
  static readonly type = '[UPLOAD] Images to Album';
  constructor(public files: any[], public id: string) {}
}

export class GetAllImagesInAlbum {
  static readonly type = '[GET] All Images Of Album';
  constructor(public id: string) {}
}

export class PutAlbumInView {
  static readonly type = 'PUT ALBUM INTO VIEW';
  constructor(public id: any) {}
}

export class RemoveAlbumFromView {
  static readonly type = 'REMOVE ALBUM FORM VIEW';
  constructor() {}
}

export class RemoveImage {
  static readonly type = '[REMOVE] Image';
  constructor() {}
}

export class GetImage {
  static readonly type = '[GET] Image';
  constructor(public id: string) {}
}

export class DownloadImage {
  static readonly type = '[DOWNLOAD] Image';
  constructor(public img: any, public name: string) {}
}

export class RemoveUploadPanel {
  static readonly type = '[REMOVE] Upload Panel';
  constructor() {}
}

export class FetchImagesOfAlbum {
  static readonly type = '[FETCH] Images of Album';
  constructor(public googleDriveId: string) {}
}

export class DownloadAlbum {
  static readonly type = '[DOWNLOAD] Album';
  constructor(public albums: Album[]) {}
}

export class SelectMultipleImages {
  static readonly type = '[SELECT] Multiple Images';
  constructor(public image: Image) {}
}

export class RemoveSelectedImage {
  static readonly type = '[REMOVE] Selected Images';
  constructor(public image: Image) {}
}

export class DownloadSelectedImages {
  static readonly type = '[DOWNLOAD] Selected Images';
  constructor() {}
}

export class DeleteSelectedImages {
  static readonly type = '[DELETE] Selected Images';
  constructor() {}
}

export class RemoveAllSelectedImages {
  static readonly type = '[REMOVE] All Selected Images';
  constructor() {}
}

export class AddAlbumCollaborator {
  static readonly type = '[ADD] Collaborator';
  constructor(public collabUser: User, public owner: User) {}
}

export class RemoveAlbumCollaborator {
  static readonly type = '[REMOVE] Collaborator';
  constructor(public collabUser: User, public owner: User) {}
}

export class EditAlbumSettings {
  static readonly type = '[EDIT] Album Settings';
  constructor(public name: string, public desc: string) {}
}

export class StartAlbumLoading {
  static readonly type ='Start Album Loading';
  constructor() {}
}

export class CloseAlbumLoading {
  static readonly type ='Start Album Loading';
  constructor() {}
}

export class RenameImage {
  static readonly type = 'RENAME image';
  constructor(public name: string, public imgid: string) {}
}

export class DeleteImages {
  static readonly type = 'DELETE Images';
  constructor(public images: string[], public albumid: string){}
}

export class RemoveImageForAlbum {
  static readonly type = 'REMOVE image from albumin view';
  constructor(public id: string) {}
}

export class DeleteAlbum {
  static readonly type = 'DELETe album';
  constructor(public albumid: string) {}
}

export class GetSharedAlbumsOfUser {
  static readonly type = 'GET SHARED ALBUMS';
  constructor() {}
}
export class SearchAndFilterAlbums {
  static readonly type = 'SEARCH and Filter Albums';
  constructor(public searchText?: string, public payload?: any) {}
}

export class SearchAndFilterImages {
  static readonly type = 'Search and Filter Images';
  constructor(public searchText?: string, public payload?: any) {}
}

export class ClearSearchText {
  static readonly type = 'Clear Search Text';
  constructor() {}
}

export class GetAllFilters {
  static readonly type = '[GET] All Filters';
  constructor() {}
}

export class SelectFilters {
  static readonly type = '[SELECT] Filters';
  constructor(public filters: SelectedImageFilters) {}
}

// export class FetchMDEForImage {
//   static readodnly type = 
// }