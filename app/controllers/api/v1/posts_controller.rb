# frozen_string_literal: true

module Api
  module V1
    class PostsController < ApplicationController
      before_action :set_post, only: %i[show update destroy]

      # GET /posts
      def index
        @posts = Post.order(created_at: :desc)

        render json: @posts
      end

      # GET /posts/1
      def show
        render json: @post
      end

      # POST /posts
      def create
        @post = Post.new(post_params)

        if @post.save
          render json: @post, status: :created, location: api_v1_post_url(@post)
        else
          render json: @post.errors, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /posts/1
      def update
        if @post.update(post_params)
          render json: @post
        else
          render json: @post.errors, status: :unprocessable_entity
        end
      end

      # DELETE /posts/1
      def destroy
        @post.destroy!
      end

      private

      # Use callbacks to share common setup or constraints between actions.
      def set_post
        @post = Post.find(params[:id])
      end

      # Only allow a list of trusted parameters through.
      def post_params
        params.require(:post).permit(:title, :body)
      end

      def set_cors_headers
        headers['Access-Control-Allow-Origin'] = Rails.application.config.allowed_cors_origins.join(', ')
        headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
        headers['Access-Control-Allow-Headers'] = 'Origin, Content-Type, Accept, Authorization'
        headers['Access-Control-Expose-Headers'] = 'Authorization'
      end
    end
  end
end
