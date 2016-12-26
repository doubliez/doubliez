defmodule Doubliez.PageController do
  use Doubliez.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
