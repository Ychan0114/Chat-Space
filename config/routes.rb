Rails.application.routes.draw do
  devise_for :users
  resources :messages, only: [:show, :new, :create]

    root :to => 'messages#index'
end
