## CWEB280 Final Project
### Tass Suderman, Levi Krozser
#### December 6th, 2022

---

## Routes
### http://localhost:3030/memes/:memeID
> ### GET
> ##### \> If memeID is provided, the meme of that ID will be returned.
> 
> ##### \> If memeID is not provided, all memes will be returned, sorted as specified
>> ##### Meme sortable fields:
>> 
>> 1) memeID (default sort field)
>> 2) mCreator (will sort by mCreator.uID)
>> 3) mCreator.userName
>
> /memes/ GET handler also supports basic filtering/searching.
> > #### Meme searchable fields:
> >1) Tags
> >2) Creator Username
> >3) Creator ID
> >4) Description
> 
> ### POST
> #### \> Requires that a memeID is not provided in the URL.
> #### \> Takes in a collection of meme object fields in the body. Will either save the meme and return the results or will return applicable errors.
>> #### Meme input requirements
>> 1) mDescription (string of 1 to 64 characters.)
>> 2) mImageRoute (string of 8 to 512 characters. Must match a valid image url. Supports http links which end in jpg, jpeg, gif, png, or svg)
>> 3) Tags (an array of string with 1-12 characters each)
>>
> ### PUT
> #### \> Executes similar to and takes in the same body values as the POST handler, but takes in a memeID parameter in the URL.
> #### \> Used to update an existing meme, but can only be executed by the meme creator. 
> ### DELETE
> #### \> Takes in a memeID as a parameter in the URL, and will delete the meme associated with that ID. Can only be executed by the meme creator.

### http://localhost:3030/commands/:commandID/
> ### GET
> ##### \> If commandID is provided, the command of that ID will be returned.
>
> ##### \> If commandID is not provided, all commands will be returned, sorted as specified
>> ##### Command sortable fields:
>>
>> 1) commandID (default sort field)
>> 2) cName
>> 3) cNumMentions
>> 4) cCreator (uses cCreator.uID)
>> 5) cCreator.userName
>
> /commands/ GET handler also supports basic filtering/searching.
> > #### Command searchable fields:
> >1) Command Name
> >2) Command Text
> >3) Command Number of Mentions
> >4) Creator Username
> >5) Creator ID
>
> ### POST
> #### \> Requires that a commandID is not provided in the URL.
> #### \> Takes in a collection of command object fields in the body. Will either save the meme and return the results or will return applicable errors.
>> #### Meme input requirements
>> 1) cName (string of 1 to 25 characters.)
>> 2) cText (string of 1 to 1024 characters. Must match a valid image url. Supports http links which end in jpg, jpeg, gif, png, or svg)
>> 3) memeID (number associated with existing meme object)
>>
> ### PUT
> #### \> Executes similar to and takes in the same body values as the POST handler, but takes in a command parameter in the URL.
> #### \> Used to update an existing command, but can only be executed by the command creator.
> ### DELETE
> #### \> Takes in a commandID as a parameter in the URL, and will delete the command associated with that ID. Can only be executed by the command creator.
 

### http://localhost:3030/tags/:tagName
> ### GET
> ##### \> If tagName is not provided, all tags will be returned.
> ##### \> If tagname is provided, all memes associated with that tag will be returned. All memes returned will include the Creator and Tags fields as well.


## Sorting and Filtering
> Basic sorting is supported.
> 
> Sorting arguments are passed into the GET URL as follows:
> 
> 1) sortorder
>   1) Allows arguments of either D, DESC, or DESCENDING, case insensitive.
>      1) If one of these arguments is received, the results will be returned in descending order.
>      2) Otherwise, items will be returned in ascending order.
> 2) sortby
>    1) Allows an object field to be specified as the field to sort by.
>       1) Allowed fields are specified for each route. Typically, the default sort field will be an object's ID.
> 3) where
>    1) Allows basic filtering and searching. Allows a string argument which will be used as a LIKE parameter for 


Due to assingment time constraints, this is the end of my README writing career. It is okay, however, because writing it was never a part of the assignment and I just did it for fun.