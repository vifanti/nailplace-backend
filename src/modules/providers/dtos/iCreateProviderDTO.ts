interface IService {
  id: number;
  title: string;
  image_url: string;
}

export default interface ICreateProviderDTO {
  user_id: string;
  latitude: number;
  longitude: number;
}
