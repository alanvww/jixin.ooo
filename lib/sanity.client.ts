import { apiVersion, dataset, hasRequiredSanityEnv, projectId, useCdn } from 'lib/sanity.api'
import { createClient, type SanityClient } from 'next-sanity'

export function getClient(preview?: { token: string }): SanityClient {
	if (!hasRequiredSanityEnv) {
		// Create a disabled client that will throw on fetch to make failures explicit at call sites
		const disabled = {
			fetch: async () => null,
			withConfig: () => disabled as unknown as SanityClient,
		} as unknown as SanityClient
		return disabled
	}
	const client = createClient({
		projectId: projectId!,
		dataset: dataset!,
		apiVersion,
		useCdn,
		perspective: 'published',
	})
	if (preview) {
		if (!preview.token) {
			throw new Error('You must provide a token to preview drafts')
		}
		return client.withConfig({
			token: preview.token,
			useCdn: false,
			ignoreBrowserTokenWarning: true,
			perspective: 'previewDrafts',
		})
	}
	return client
}
