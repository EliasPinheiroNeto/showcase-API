## Api routes

### ADM

>**POST** - `/login`
>
>Login do ADM.

### Produtos

>**GET** - ` /products`
>
>Retorna todos os produtos.

>**GET** - ` /products/:categoryId`
>
>Retorna todos os produtos por categoria.

>**GET** - ` /product/:id`
>
>Retorna um produto especifico.

>**POST** - ` /product`
>
>Adiciona um produto ao banco de dados. Requer autorização.

>**PATCH** - ` /product`
>
>Atualiza as informações de um produto. Requer autorização.

>**DELETE** - ` /product`
>
>Remove um produto do banco de dados. Requer autorização. Apaga todas as imagens do produto.

### Imagens

>**GET** - ` /picture/:picName`
>
>Retorna uma imagem com base no seu nome.

>**POST** - ` /picture`
>
>Adiciona uma imagem ao arquivo da API. Requer autorização. Usa o multpart/formdata com o campo `file`.

>**DELETE** - ` /picture`
>
>Remove uma imagem ao arquivo da API. Requer autorização.

### Categorias

>**GET** - ` /categories`
>
>Retorna todas as categorias.

>**POST** - ` /category`
>
>Adiciona uma categoria ao banco de dados. Requer autorização.

>**PATCH** - ` /category`
>
>Atualiza as informações de uma categoria. Requer autorização.

>**DELETE** - ` /category`
>
>Remove uma categoria do banco de dados. Requer autorização. Apaga todos os produtos da categoria, ou os atualiza com o campo `newCategoryId` no JSON.