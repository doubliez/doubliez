defmodule Doubliez.RoomChannel do
  use Phoenix.Channel

  def join("room:", _message, socket) do
    send self(), :after_join
    {:ok, socket}
  end

  def handle_info(:after_join, socket) do
    broadcast! socket, "new_user", %{}
    {:noreply, socket}
  end
end
