interface ApiErrorData {
	errors?: Array<{
		code: string | null;
		message: string;
	}>;
}

export class ApiError extends Error {
	public constructor(
		public readonly response: Response,
		public readonly data?: ApiErrorData
	) {
		super(data?.errors?.[0]?.message || response.statusText);
		this.name = 'ApiError';
	}
}
