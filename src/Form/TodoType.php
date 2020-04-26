<?php

namespace App\Form;

use App\Entity\Todo;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;

class TodoType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('task',TextType::class,[
                'constraints'=>[
                    new NotBlank(['message'=>'Le nom de la tâche ne peut être vide !']),
                    new Length([
                    'min'=>3,
                     'max'=>20,
                    'minMessage'=>'Entrer au moins 3 charact pour la tâche',
                    'maxMessage'=>"Vous la tâche ne peut dépasser 20 charactères"
                    ])
                ]
            ])
            ->add('description',TextareaType::class,[
                'constraints'=>[
                    new NotBlank(['message'=>'Le champ description ne peut être vide !']),
                    new Length([
                    'min'=>3,
                    'max'=>70,
                    'minMessage'=>'Entrer au moins 3 charact pour la description',
                    'maxMessage'=>'La description ne peut dépasser 50 caractères'
                    ])
                ]
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Todo::class,
            'csrf_protection'=>false
        ]);
    }
}
