class apiTouits {

    static async getTouits(ts) {
        return await fetch(`http://touiteur.cefim-formation.org/list?ts=${ts}`)
            .then(response => response.json())
            .then(
                result => {
                    return result;
                },
                error => {
                    return error;
                });
    }

    static async postTouit(name, message) {

        const data = new FormData();
        data.append('name', name);
        data.append('message', message);

        const options = {
            method: 'POST',
            body: data
        }

        return await fetch(`http://touiteur.cefim-formation.org/send`, options)
            .then(response => response.json())
            .then(result => {
                    return result
                },
                error => {
                    return error
                });
    }

    static async getTrendings() {
        return await fetch(`http://touiteur.cefim-formation.org/trending`)
            .then(response => response.json())
            .then(result => {
                    return result
                },
                error => {
                    return error
                });
    }

    static async getCommentsByMessage(id){
        return fetch(`http://touiteur.cefim-formation.org/comments/list?message_id=${id}`)
            .then(response => response.json())
            .then(result => {
                    return result;
                },
                error => {
                    return error;
                })
    }

    static async updateLikeOnComments(id){
        return fetch(`http://touiteur.cefim-formation.org/get?id=${id}`)
            .then(response => response.json())
            .then(result => {
                    return result
                },
                error => {
                    return error
                })
    }

    static async putDeleteLike(url, method, id) {

        const data = new FormData();
        data.append('message_id', id);

        const options = {
            method: method,
            body: data
        }
        return fetch(url, options)
            .then(response => response.json())
            .then(result => {
                return result
                },
                error => {
                  return error
                })

    }

    static async sendComment(name, comment, id) {
        const data = new FormData();
        data.append('name', name);
        data.append('comment', comment);
        data.append('message_id', id);

        const options = {
            method: 'POST',
            body: data
        }
        return fetch(`http://touiteur.cefim-formation.org/comments/send`, options)
            .then(response => response.json())
            .then(result => {
                    return result;
                },
                error => {
                    return error;
                })
    }

    static async getAvatar(pseudo){
        return fetch(`http://touiteur.cefim-formation.org/avatar/get?username=${pseudo}`)
            .then(response => response.blob())
            .then(images => {
                // Then create a local URL for that image and print it
                return URL.createObjectURL(images)
            })

    }

}

export default apiTouits;