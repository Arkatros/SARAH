export interface ApiResponse<T = null>
{
    message: string;
    data?: T;
}