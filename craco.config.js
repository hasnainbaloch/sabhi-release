const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            '@primary-color': '#1D6E71',
                            '@link-color': '#1D6E71',
                            '@success-color': '#1D6E71',
                            '@text-color-secondary': '#8c8c8c',
                            '@warning-color': '#1D6E71',
                            '@error-color': 'crimson',
                            '@heading-color': '#1D6E71',
                            '@text-color': '#1D6E71',
                            '@disabled-color': '#1D6E71',
                            '@input-border-color': '#D9D9D9',
                            '@layout-sider-background': '#FFFFFF',
                            '@item-active-bg': '#E6FFFB',
                            '@mentions-dropdown-bg': '#E6FFFB',
                            '@menu-item-active-bg': '#E6FFFB',
                            '@border-color-base': '#1D6E71',
                            '@btn-link-hover-bg': '#1D6E71',
                            '@radio-button-checked-bg': '#1D6E71',
                            '@radio-button-hover-color': '#FFFFFF',
                            '@radio-button-active-color': '#FFFFFF',
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};