/* eslint-disable no-console */

const Logger = {
	log(message: string, data?: any): void {
		// Regular log
		console.log(`[LOG] ${message}`, data || '');
	},

	error(message: string, error: Error): void {
		// Log errors with more visibility
		console.error(`[ERROR] ${message}:`, error.message);

		// Optionally log the stack trace for detailed debugging
		console.error(error.stack);
	},

	// You can add more utility methods like warn, info, etc.
};

export default Logger;
