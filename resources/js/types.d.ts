declare global {
    interface Window {
        csrfToken: string;
        urls: {
            formatting_help: string;
            images: {
                root: string;
                no_image: string;
                smiley_folder: string;
            },
            api: {
                format: string;
                image_upload: string;
                get_post: string;
            },
            embed: {
                article: string;
                download: string;
                map: string;
            },
            list: {
                article: string;
                download: string;
                map: string;
            },
            view: {
                article: string;
                download: string;
                map: string;
                thread: string;
                user: string;
            }
        };
    }
}

export { };
