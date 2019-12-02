import uiStore from '../stores/ui'

class VersionService {
    public async requestVersion() {
        const response = await fetch(process.env.REACT_APP_IOGR_API_VERSION_URI, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        })

        if (!response.ok) throw new Error('Failed to negotiate with server')

        const result = await response.json()
        uiStore.setVersion(result.version)
    }
}

const versionService = new VersionService()
export default versionService
