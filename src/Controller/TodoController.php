<?php

namespace App\Controller;

use App\Entity\Todo;
use App\Form\TodoType;
use App\Repository\TodoRepository;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use Doctrine\ORM\EntityManagerInterface;
use http\Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/todo", name="api_todo")
 */
class TodoController extends AbstractController
{

    private $em;
    private $todoRepo;

    public function __construct(EntityManagerInterface $em, TodoRepository $todoRepo)
    {
        $this->em = $em;
        $this->todoRepo = $todoRepo;
    }

    /**
     * @Route("/read", name="api_todo_read")
     */
    public function read()
    {
        $todos = $this->todoRepo->findAll();

        $arrayOfTodos = [];

        foreach ($todos as $todo) {

            $arrayOfTodos[] = $todo->toArray();
        }
        //dd($arrayOfTodos);
        return $this->json($arrayOfTodos);
    }

    /**
     * @Route("/create", name="api_todo_create",methods={"POST"})
     * @param Request $request
     * @return JsonResponse
     */
    public function create(Request $request)
    {

        $content = json_decode($request->getContent());

        $form = $this->createForm(TodoType::class);
                // $nonObject = (array)$content;
                //dd($nonObject
            $form->submit((array)$content);
        if (!$form->isValid()){
            $errors= [];
           foreach ($form->getErrors(true,true) as $error){
               $propertyName=$error->getOrigin()->getName();
               $errors[$propertyName] = $error->getMessage();
           }

           return $this->json([
               'message' => ['text' => join("\n", $errors), 'level' => 'error'],
           ]);
        }

        $todo = new Todo();
        $todo->setTask($content->task);
        $todo->setDescription($content->description);

        try{
            $this->em->persist($todo);
            $this->em->flush();

        }catch(UniqueConstraintViolationException $ex){
        //error message
            return $this->json([
                'message'=>['text'=>"Ajout impossible, cette tâche existe déjà . ",'level'=>'error']
            ]);
        }

        return $this->json([
            'todo'=>$todo->toArray(),
            'message'=>['text'=>'Nouvelle tâche ajoutée à votre liste ','level'=>'success']
        ]);
    }

    /**
     * @Route("/update/{id}", name="api_todo_update",methods={"PUT"})
     * @param Request $request
     * @param Todo $todo
     * @return JsonResponse
     */
    public function update(Request $request,Todo $todo)
    {
        $content = json_decode($request->getContent());

        $form = $this->createForm(TodoType::class);
        $nonObject = (array)$content;
        unset($nonObject['id']); // pour éviter l erreur This form should not contain extra fields.
        $form->submit($nonObject);


        if (!$form->isValid()) {
            $errors = [];
            foreach ($form->getErrors(true, true) as $error) {
                $propertyName = $error->getOrigin()->getName();
                $errors[$propertyName] = $error->getMessage();
            }
            return $this->json([
                'message' => ['text' => join("\n", $errors), 'level' => 'error'],
            ]);

        }

        if ($todo->getTask() === $content->task && $todo->getDescription() === $content->description) {
            return $this->json([
                'message' => ['text' => 'Aucune modification à faire. Le nom et la description n\'ont pas changé', 'level' => 'error']
            ]);
        }

        $todo->setTask($content->task);
        $todo->setDescription($content->description);
        try{
            $this->em->flush();
        }catch(Exception $ex){
            //error message
            return $this->json([
                'message'=>['text'=>"Impossible de modifier cette tâche ",'level'=>'error']
            ]);
        }
        return $this->json([
            'todo'    => $todo->toArray(),
            'message'=>['text'=>'Tâche modifiée avec succès', 'level'=>'success']
        ]);
    }

    /**
     * @Route("/delete/{id}", name="api_todo_delete",methods={"DELETE"})
     * @param Todo $todo
     * @return JsonResponse
     */
    public function delete(Todo $todo)
    {
        try{
            $this->em->remove($todo);
            $this->em->flush();
        }catch(Exception $ex){
            //error message
            return $this->json([
                'message'=>['text'=>"Impossible de supprimer cette tâche ",'level'=>'error']
            ]);
        }
        return $this->json([
            'message'=>['text'=>'Tâche supprimée avec succès','level'=>'success']
        ]);
    }
}
