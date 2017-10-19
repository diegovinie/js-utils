# utils
Personal package with some utilities

### How to use
```php
<?php
require 'vendor/autoload.php';

use Dv\Utils\RandomFakeIdentity;

$identity = new RandomFakeIdentity('f');
$identity->name;   // "María Rosa"
$identity->getIdentity();
//

RandomFakeIdentity::generate('m');
//
```
