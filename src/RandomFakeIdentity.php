<?php
/**
 * @author Diego Viniegra
 * @license MIT
 */

namespace Dv\Utils;

/**
 * Genera una identidad aleatoria basada en los estándares
 * venezolanos
 */
class RandomFakeIdentity
{
    /**
     * Construye una nueva instancia
     *
     * @param string $gender el género ('m'|'f')
     */
    public function __construct(string $gender = null)
    {
        $this->name = $this->genName($gender);
        $this->surname = $this->genSurname();
        $this->ci = $this->genCi();
        $this->email = $this->genDummyEmail($this->name);
        $this->phone = $this->genCel();
        $this->birth = $this->genBirthdate($this->ci);
    }

    /**
     * Genera una identidad (estático)
     *
     * @param string $gender el género ('m'|'f')
     * @return array datos generados
     */
    static function generate(string $gender = null)
    {
        $iden = new RandomIdentity($gender);

        return $iden->getIdentity();
    }

    /**
    * Retorna un array con la identidad creada
    *
    * @return array con la identidad
    */
    public function getIdentity()
    {
        $name = $this->name;
        $surname = $this->surname;
        $ci = $this->ci;
        $email = $this->email;
        $phone = $this->phone;
        $birth = $this->birth;

        return compact('name', 'surname', 'ci', 'email', 'phone', 'birth');
    }

    /**
     * Devuelve un nombre único o doble
     *
     * @param string|null $gender 'm'|'f' o null para ser aleatorio
     * @return string|bool nombre de una o dos palabras o false si falla
     */
    protected function genName(string $gender = null)
    {
        $males = array(
            'Antonio', 'José', 'Manuel', 'Francisco', 'Juan', 'David', 'Diego', 'José Manuel',
            'José Antonio', 'José Luis', 'Jesús', 'Javier', 'Francisco Javier', 'Marcos', 'Gabriel',
            'Carlos', 'Daniel', 'Miguel', 'Rafael', 'Pedro', 'José Manuel', 'Juan José',
            'Ángel', 'Alejandro', 'Miguel Ángel', 'José María', 'Fernando', 'Carlos Alberto', 'Luis Enrique', 'Esteban', 'Ernesto José', 'Arturo',
            'Luis', 'Luis Enrique', 'Braulio', 'Sergio', 'Pablo', 'Jorge', 'Alberto', 'Lenin',
        );

        $females = array(
            'María Carmen', 'María', 'Carmen', 'Josefa', 'Isabel', 'Ana María',
            'Andreína', 'Vanessa', 'Valeria', 'Mariú', 'Catalina', 'María Antonieta', 'Elisabeth', 'Ana Gabriela', 'María Alejandra', 'Erika', 'Luz Marina',
            'María Dolores', 'María Pilar', 'María Teresa', 'Ana', 'Francisca',
            'Laura', 'Antonia', 'Dolores', 'María Angeles', 'Cristina', 'Marta',
            'María José', 'María Isabel', 'Pilar', 'María Luisa', 'Concepción',
            'Lucía', 'Mercedes', 'Manuela', 'Elena', 'Rosa María',
        );

        $genders = ['m' => $males, 'f' => $females];

        if(null === $gender){
            $selected = $genders[array_rand($genders)];
        }
        else{
            $gender = strtolower($gender)[0];

            // Si se introdujo mal el parámetro retorna false
            if(!array_key_exists($gender, $genders)) return false;

            $selected = $genders[$gender];
        }

        return $selected[array_rand($selected)];
    }

    /**
     * Devuelve uno o dos apellidos
     *
     * @param int $rep porcentaje de probabilidad de segundo apellido
     * @return string uno o dos apellidos
     */
    protected function genSurname(int $rep = 66)
    {
        $snames = array(
            'García', 'González', 'Rodríguez', 'Fernández', 'López', 'Martínez', 'Contreras', 'Vivas', 'Pausini', 'Graterol', 'Villalobos', 'Morales',
            'Querales', 'Villegas', 'Ochoa', 'Berroterán', 'Moya', 'Noriega', 'Mathaus', 'Miller', 'Córdova', 'Cabrera', 'Guillén', 'Sosa', 'Fasano',
            'Sánchez', 'Pérez', 'Gómez', 'Martín', 'Jiménez', 'Ruiz',
            'Hernández', 'Díaz', 'Moreno', 'Álvarez', 'Muñoz', 'Romero',
            'Alonso', 'Gutiérrez', 'Navarro', 'Torres', 'Domínguez', 'Vázquez',
            'Ramos', 'Gil', 'Ramírez', 'Serrano', 'Blanco', 'Suárez', 'Molina',
            'Morales', 'Ortega', 'Delgado', 'Castro', 'Ortíz', 'Rubio', 'Marín',
            'Sanz', 'Iglesias', 'Nuñez', 'Medina', 'Garrido'
        );

        $res = $snames[array_rand($snames)];

        // Repetición aleatoria del segundo apellido
        if(mt_rand(0, 100) < $rep) $res .= ' '.$snames[array_rand($snames)];

        return $res;
    }

    /**
     * Genera un email partiendo del nombre
     */
    protected function genDummyEmail(string $name, $id = null)
    {
        $n = explode(' ', strtolower($name));
        $res = $this->cleanString($n[0])
                .($id? $id : mt_rand(1, 99))
                .'@dummy.net.ve';

        return $res;
    }

    /**
     * Genera un número de cedula de identidad
     */
    protected function genCi()
    {
        // El 10% son extranjeros.

        $nac = mt_rand(0, 99) < 10? 'E' : 'V';

        $num = $nac == 'E'? mt_rand(80000000, 84000000)
                        : mt_rand(8000000, 20000000);

        return $nac.$num;
    }

    /**
     * Genera un número de teléfono celular
     */
    protected function genCel()
    {
        $provs = array('0412', '0414', '0416', '0424', '0426');

        $num = $provs[array_rand($provs)];
        $num .= '-'.mt_rand(1000000, 9999999);

        return $num;
    }

    /**
     * Genera una fecha de nacimiento acorde con la cédula
     */
    protected function genBirthdate(string $ci = null)
    {
        $rel = array(
            '8' => 1968,         '9' => 1970,         '10' => 1973,
            '11' => 1974,        '12' => 1977,        '13' => 1980,
            '14' => 1981,        '15' => 1984,        '16' => 1985,
            '17' => 1987,        '18' => 1989,        '19' => 1991,
            '20' => 1994
        );

        if($ci){
            $num = (int)preg_replace("/[^0-9]*/", '', $ci);
            $n = intval($num / 1000000);

            $year = array_key_exists($n, $rel)? $rel[$n] : mt_rand(1950, 1988);
        }
        else{
            $year = mt_rand(1950, 1999);
        }

        $month = mt_rand(1, 12);

        $endDay = $month == 2? ($year % 4? 29 : 28) : in_array($month, [4, 6, 9, 11])? 30 : 31;

        $day = mt_rand(1, $endDay);

        return "$year-$month-$day";
    }

    /**
     * Limpia el string de letras acentuadas y otros
     */
    private function cleanString(string $string)
    {
        return preg_replace("/[^a-z0-9_\.]/", '', $string);
    }
}
