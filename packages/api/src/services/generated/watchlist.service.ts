import {
  ResponseDataObject,
  ResponseDataPageResponseWatchListResponse,
  WatchListAddRequest,
} from '../../generated-types';
import { CustomAxiosInstance } from '../../types';

/**
 * 관심종목 관리 API
 * OpenAPI Generator로 생성된 타입을 사용하며, 기존 Axios 인스턴스와 통합
 */
export class WatchListService {
  private axios: CustomAxiosInstance;

  constructor(axiosInstance: CustomAxiosInstance) {
    this.axios = axiosInstance;
  }

  /**
   * 관심종목 목록 조회
   * 사용자의 관심종목 목록을 조회한다. 페이징 파라미터가 없으면 전체 조회한다.
   * @param pageRequest - 페이징 정보
   * @returns 관심종목 목록 조회 결과
   */
  getWatchList(pageRequest?: string) {
    return this.axios.get<ResponseDataPageResponseWatchListResponse>(
      `/main/v1/watchlist`,
      {
        params: {
          pageRequest,
        }
      }
    );
  }

  /**
   * 관심종목 등록
   * 새로운 관심종목을 등록한다.
   * @returns 관심종목 등록 결과
   */
  addToWatchList(request: WatchListAddRequest) {
    return this.axios.post<ResponseDataObject>(
      `/main/v1/watchlist`,
      request
    );
  }

  /**
   * 관심종목 삭제
   * 등록된 관심종목을 삭제한다.
   * @param stockCode - 종목 코드
   * @returns 관심종목 삭제 결과
   */
  removeFromWatchList(stockCode: string) {
    return this.axios.delete<ResponseDataObject>(
      `/main/v1/watchlist/${stockCode}`
    );
  }
}
