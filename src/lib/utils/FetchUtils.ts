import { z } from 'zod';

import { ApiError } from './ApiError';
import Logger from './Logger';

interface FetchOptions<T> {
	method: string;
	body?: T;
	headers?: Record<string, string>;
}

const fetchOptionsSchema = z.object({
	method: z.string(),
	body: z.unknown().optional(),
});

async function api<T>(url: string, options: FetchOptions<T>): Promise<T> {
	try {
		const validatedOptions = fetchOptionsSchema.parse(options);

		const headers = {
			'Content-Type': 'application/json',
		};

		const config = {
			method: validatedOptions.method,
			headers,
			body: validatedOptions.body
				? JSON.stringify(validatedOptions.body)
				: undefined,
		};

		const response = await fetch(url, config);

		if (!response.ok) {
			throw new Error('Error performing API operation.');
		}

		if (options.method === 'DELETE') {
			return {} as T; // DELETE requests don't return data, just an empty object
		}

		const responseData = (await response.json()) as T;
		return responseData;
	} catch (error) {
		if (error instanceof ApiError) {
			Logger.error('API Error:', error);
		}

		throw error;
	}
}

export { api, fetchOptionsSchema };
